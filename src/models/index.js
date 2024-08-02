import { Sequelize } from 'sequelize';
import sequelize from '../config/database';

const models = {
  Blog: require('./blog').default,
  User: require('./user').default
  // Add other models here
};

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

export { sequelize, Sequelize };
export default models;
