import { useDatabase, connections ,connection_databases, assignConnections, getDialect } from './databaseConfig';  // Asume que el código está en 'databaseConfig.ts'
import dotEnv from 'dotenv';

// Cargar Variables
dotEnv.config();
 
// Conexiones a base de Datos
connection_databases.push(
    {
        name: process.env.DB_DATABASE_1 || 'db_name',
        user: process.env.DB_USER_1 || 'db_user',
        password: process.env.DB_PASSWORD_1 || 'db_password',
        host: process.env.DB_HOST_1 || 'db_host',
        dialect: getDialect(process.env.DB_DIALECT_1 || 'postgres'),
    },
);

// Asigna las conexiones
assignConnections().then(() => {
    console.log('Conexiones a las bases de datos OK');
}).catch((error) => {
    console.error('Error al asignar conexiones a las bases de datos:', error);
});

export default connections;
