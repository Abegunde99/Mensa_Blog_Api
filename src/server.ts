import app from './app';
import dotenv from 'dotenv';
import sequelize from './config/database';
dotenv.config();

async function testConnection() {
    try {
      await sequelize.authenticate();
      console.log('✅ Database connection has been established successfully.');
    } catch (error) {
      console.error('❌ Unable to connect to the database:', error);
    }
}
  
  // Call the function to test the connection
  testConnection();

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT}`);
});