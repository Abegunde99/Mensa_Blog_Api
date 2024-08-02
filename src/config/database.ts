import { Sequelize } from 'sequelize';
import config from './_config';

const sequelize = new Sequelize(config.database as string, config.username as string, config.password, {
  host: config.host,
  "dialect": "mysql",
  "logging": false,
  "pool": {
    "max": 5,
    "min": 0,
    "acquire": 30000,
    "idle": 10000
  },
});

export default sequelize;
