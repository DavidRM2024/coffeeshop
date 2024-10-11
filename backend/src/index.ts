import dotEnv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import { useDatabase } from './db/databaseConfig';

// Carga de las variables de entorno definidas en el archivo .env hacia process.env
dotEnv.config();

// Instancia de express
const app = express();
const port = process.env.APP_PORT || 5000;

// middleware
app.use(express.json());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// definicion de rutas
app.get('/', async (req, res) => {
  const coffeeShopDB = useDatabase('coffeeShopDB');
  
  try {
    const result = await coffeeShopDB?.query("SELECT * FROM users");

    if (result) {
      res.status(200).json({
        message: 'Consulta exitosa',
        data: result
      }); // Envía los resultados al cliente en formato JSON
    } else {
      res.status(404).send('No se encontraron usuarios'); // Envía un mensaje si no se encuentran resultados
    }
    console.log(result);
  } catch (error) {
    res.status(500).send('Algo salió mal');
    console.error('Error al realizar la consulta:', error);
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});