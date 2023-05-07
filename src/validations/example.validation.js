const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createExample = {
  body: Joi.object().keys({
    description: Joi.string().required(),
    active: Joi.boolean().required(),
  }),
};

const getExamples = {
  query: Joi.object().keys({
    active: Joi.boolean(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getExample = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateExample = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      description: Joi.string().required(),
      active: Joi.boolean().required(),
      id: Joi.string(),
    })
    .min(1),
};

const deleteExample = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createExample,
  getExamples,
  getExample,
  updateExample,
  deleteExample,
};
