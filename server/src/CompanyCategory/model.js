const companyCategory = (sequelize, DataTypes) => {
  const CompanyCategory = sequelize.define(
    'company_category',
    {
      name: DataTypes.STRING
    },
    { underscored: true }
  );

  // TODO: probably don't need this
  // CompanyCategory.associate = models => {
  //   CompanyCategory.hasMany(models.Company);
  // };

  return CompanyCategory;
};

export default companyCategory;
