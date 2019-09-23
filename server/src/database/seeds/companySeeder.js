import Chance from 'chance';
import { models } from '../../config';

const chance = new Chance();

const companySeeder = async (count = 100) => {
  const companies = [];
  while (count) {
    const rand = Math.floor(Math.random() * Math.floor(7)) + 1;
    companies.push({
      username: chance.first() + chance.last() + rand,
      password: process.env.SEED_PASSWORD,
      email: chance.email(),
      name: chance.company(),
      phone: chance.phone(),
      company_category_id: rand
    });
    count--;
  }

  try {
    await models.Company.bulkCreate(companies);
  } catch (err) {
    console.error(err);
  }
};

export default companySeeder;
