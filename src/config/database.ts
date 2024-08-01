import { Sequelize } from 'sequelize';
import dotenv from 'dotenv'
dotenv.config()

import environ from './index'


const sequelize = new Sequelize(environ.DB as string, environ.DB_USER as string, environ.DB_PASSWORD, {
  host: environ.DB_HOST,
  dialect: 'mysql', // or 'postgres', 'sqlite', 'mariadb'
  logging: false, // set to console.log to see the raw SQL queries
});


export default sequelize;