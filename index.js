import dotenv from 'dotenv';
dotenv.config();
import neo4j from 'neo4j-driver';

async function main(){
    const driver = neo4j.driver(
        process.env.NEO4J_URI,
        neo4j.auth.basic(
            process.env.NEO4J_USERNAME,
            process.env.NEO4J_PASSWORD
        )
    );

    await driver.executeQuery(
        'MATCH (p:Pessoa) WHERE elementid(p) = $id DETACH DELETE p',
        {id:'4:095eb451-d05c-4805-8929-0d26483a5fff:4'}
    ).then(records => {
        console.log(records.summary.counters._stats)}).catch(error => {
        console.log(error);
    });
}

main();