const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createCompany = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
    active: Joi.boolean(),
  }),
};

const getCompanies = {
  query: Joi.object().keys({
    name: Joi.string(),
    active: Joi.boolean(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getCompanyByID = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateCompany = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
      description: Joi.string(),
      active: Joi.boolean(),
      id: Joi.string(),
    })
    .min(1),
};

const deleteCompany = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createCompany,
  getCompanies,
  getCompanyByID,
  updateCompany,
  deleteCompany,
};
