const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createTransaction = {
  body: Joi.object().keys({
    timestamp: Joi.string().required(),
    description: Joi.string().required(),
    amount: Joi.number().required(),
    nativeCurrency: Joi.string().required(),
    isDeposit: Joi.boolean().required(),
    userId: Joi.string().custom(objectId),
  }),
};

const getTransactions = {
  query: Joi.object().keys({
    monthDate: Joi.date(),
    startDate: Joi.date(),
    endDate: Joi.date(),
    date: Joi.date(),
    isDeposit: Joi.boolean(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getTransaction = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateTransaction = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      timestamp: Joi.string().required(),
      description: Joi.string().required(),
      amount: Joi.number().required(),
      nativeCurrency: Joi.string().required(),
      isDeposit: Joi.boolean().required(),
      id: Joi.string(),
      userId: Joi.string(),
    })
    .min(1),
};

const deleteTransaction = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createTransaction,
  getTransactions,
  getTransaction,
  updateTransaction,
  deleteTransaction,
};
