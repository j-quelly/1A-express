const company = (sequelize, DataTypes) => {
  const Company = sequelize.define(
    'company',
    {
      username: {
        type: DataTypes.STRING,
        unique: true
      },
      password: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING,
        unique: true
      },
      name: {
        type: DataTypes.STRING
      },
      phone: {
        type: DataTypes.STRING
      }
    },
    {
      underscored: true
    }
  );

  Company.associate = models => {
    Company.belongsTo(models.CompanyCategory, { foreignKey: 'company_category_id'});
  };

  // TODO: should this belong here?
  // TODO: password should be passed as well...
  Company.findByLogin = async login => {
    let company = await Company.findOne({
      where: { username: login }
    });

    if (!company) {
      company = await Company.findOne({
        where: { email: login }
      });
    }

    return company;
  };

  return Company;
};

export default company;
