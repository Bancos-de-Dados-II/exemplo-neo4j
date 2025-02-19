import dotenv from 'dotenv';
dotenv.config();
import neo4j from 'neo4j-driver';

async function conectar(){
    const driver = neo4j.driver(
        process.env.NEO4J_URI,
        neo4j.auth.basic(
            process.env.NEO4J_USER,
            process.env.NEO4J_PASSWORD
        )
    );
    const serverInfo = await driver.getServerInfo();
    console.log('Connection established');
    console.log(serverInfo);
}

conectar();