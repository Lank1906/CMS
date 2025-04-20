import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  dialect: 'mysql',
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
});
export default sequelize;
