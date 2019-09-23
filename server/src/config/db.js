import Sequelize from 'sequelize';

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  dialect: process.env.DB_CONNECTION
});

// TODO: automate this with node
const models = {
  Company: sequelize.import('../Company/model.js'),
  CompanyCategory: sequelize.import('../CompanyCategory/model.js')
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
