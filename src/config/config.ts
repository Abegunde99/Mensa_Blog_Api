import dotenv from 'dotenv'
dotenv.config()


export default {
  "username": process.env.DB_USER,
  "password": process.env.DB_PASSWORD,
  "database": process.env.DB,
  "host": process.env.DB_HOST,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRE: process.env.JWT_EXPIRES_IN,
  PORT: process.env.PORT
}
