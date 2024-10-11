import { Dialect, Sequelize } from 'sequelize';
import dotEnv from 'dotenv';

// Carga de las variables de entorno definidas en el archivo .env hacia process.env
dotEnv.config();

export const validDialects: Dialect[] = ['mysql', 'postgres', 'sqlite', 'mariadb', 'mssql', 'db2', 'snowflake', 'oracle'];
export let connections: { [key: string]: Sequelize } = {};
export const connection_databases: ConnectionInterface[] = [];

export interface ConnectionInterface {
    name: string;
    user: string;
    password: string;
    host: string;
    dialect?: Dialect | undefined
}

export const getDialect = (dialect: string): Dialect | undefined =>
    validDialects.includes(dialect as Dialect) ? (dialect as Dialect) : undefined;

export const connectToDatabase = async (connectionInterface: ConnectionInterface) => {

    const { name, user, password, host, dialect } = connectionInterface;

    const sequelize = new Sequelize(name, user, password, {
        host,     // Forma abreviada, equivalente a host: host
        dialect,  // Forma abreviada, equivalente a dialect: dialect
        logging: true,
    });

    try {
        await sequelize.authenticate();
        console.log(`Conexión a la base de datos exitosa: ${name}`);
        return sequelize;
    } catch (err) {
        console.error(`No se puede conectar a la base de datos: ${name}`, err);
        return null; // Retornar null si la conexión falla
    }
};

export const assignConnections = async () => {
    for (const dbConfig of connection_databases) {
       
        const connection = await connectToDatabase(dbConfig);
        if (connection) {
            connections[dbConfig.name] = connection; // Asigna la conexión al objeto Connections
        }
    }
    return connections;

};

export const useDatabase =  (dbName: string) => {
    const sequelize = connections[dbName];
    
    if (!sequelize) {
        console.error(`No hay conexión disponible para la base de datos: ${dbName}`);
        return;
    }

    /*
 
        try {
            const result = await sequelize.query('SELECT * FROM my_table'); // Reemplaza con tu consulta
            console.log(result);
        } catch (error) {
            console.error('Error al realizar la consulta:', error);
        }

    */

    return sequelize;

};
