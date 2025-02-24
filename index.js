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
        'MATCH (p1:Pessoa{email:$email1}) MATCH(p2:Pessoa{email:$email2}) CREATE (p1)-[:AMIGO]->(p2)',
        {email1: "joao@gmail.com", email2:"maria@gmail.com"}
    ).then(records => {
        console.log(records.summary.counters._stats);
    }).catch(error => {
        console.log(error);
    });
}

main();