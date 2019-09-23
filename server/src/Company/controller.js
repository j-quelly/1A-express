import { validationResult } from 'express-validator';

export const findAll = async (req, res) => {
  const {
    context: { models },
    query: { limit = 10, offset }
  } = req;

  // NOTE: I do not use try/catch since the asyncHandler will catch errors
  const companies = await models.Company.findAndCountAll({ limit, offset });
  if (companies.count === 0) {
    return res.status(204);
  }

  const companiesWithMetaData = Object.assign({}, companies, {
    pages: Math.ceil(parseFloat(companies.count) / parseFloat(limit))
  });

  return res.json(companiesWithMetaData);
};

export const find = async (req, res) => {
  const {
    context: { models },
    params: { id }
  } = req;

  const company = await models.Company.findByPk(id);
  if (!company) {
    return res.status(404);
  }

  return res.json(company);
};

export const create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const {
    context: { models },
    body: { username, password, email, name, phone, company_category_id }
  } = req;

  const company = await models.Company.create({
    username,
    password,
    email,
    name,
    phone,
    company_category_id
  });

  if (!company) {
    return res.status(404);
  }

  return res.json(company);
};

export const update = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const {
    context: { models },
    params: { id },
    body: { email, name, phone, company_category_id }
  } = req;

  const [, [company]] = await models.Company.update(
    {
      email,
      name,
      phone,
      company_category_id
    },
    { where: { id }, returning: true }
  );

  if (!company) {
    const err = new Error('Not found');
    err.status = 404;
    return next(err);
  }

  return res.json(company);
};
