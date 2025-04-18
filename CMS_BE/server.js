import express from 'express';
import dotenv from 'dotenv';
import sequelize from './src/config/db.js';
import cors from 'cors';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.get('/', (req, res) => {
  res.status(200).send("Server running on http://localhost:8000");
});


try {
  await sequelize.authenticate();
  app.listen(8000);
} catch (err) {
  console.error("Unable to connect to DB:", err.message);
}