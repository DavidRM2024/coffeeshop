import dotEnv from 'dotenv';
import express from 'express';
import morgan from 'morgan'

dotEnv.config();

const app = express();
const port = process.env.APP_PORT || 5000;

app.get('/', (req, res) => {
  res.send('Hello World! XXX');
});

app.use(express.json());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});