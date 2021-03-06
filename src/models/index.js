// Dependencies
import Sequelize from 'sequelize';

// Database Initialization
const sequelize = new Sequelize({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  dialect: 'postgres',
  logging: true,
});

// Models and Associations
const models = {
  User: sequelize.import('./user'),
  Project: sequelize.import('./project'),
  ProjectDetail: sequelize.import('./project-detail'),
  Category: sequelize.import('./category'),
  NFT: sequelize.import('./nft'),
  Transfer: sequelize.import('./transfer'),
  Offer: sequelize.import('./offer'),
  Rent: sequelize.import('./rent'),
  Currency: sequelize.import('./currency'),
};


Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export {sequelize};
export default models;
