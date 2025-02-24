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
        'MATCH (p:Pessoa)-[:AMIGO]->(p2) WHERE p.email=$email RETURN p2.nome, p2.email',
        {email:'joao@gmail.com'}
    ).then(records => {
        console.log(records.records);
    }).catch(error => {
        console.log(error);
    });
}

main();