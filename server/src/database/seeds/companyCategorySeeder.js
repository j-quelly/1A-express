import { models } from '../../config';

const companyCategorySeeder = async () => {
  try {
    await models.CompanyCategory.bulkCreate([
      { name: 'Landscaping' },
      { name: 'Painting' },
      { name: 'Construction' },
      { name: 'Electrical' },
      { name: 'Personal Services' },
      { name: 'Mechanical' },
      { name: 'Plumbing' }
    ]);
  } catch (err) {
    console.error(err);
  }
};

export default companyCategorySeeder;
