const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createLoyaltyCard = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
    type: Joi.string(),
    rewardCount: Joi.number().required(),
    active: Joi.boolean(),
    companyId: Joi.string().required().custom(objectId),
  }),
};

const getLoyaltyCards = {
  query: Joi.object().keys({
    name: Joi.string(),
    active: Joi.boolean(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getLoyaltyCardByID = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateLoyaltyCard = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
      description: Joi.string(),
      type: Joi.string(),
      rewardCount: Joi.number().required(),
      active: Joi.boolean(),
    })
    .min(1),
};

const deleteLoyaltyCard = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createLoyaltyCard,
  getLoyaltyCards,
  getLoyaltyCardByID,
  updateLoyaltyCard,
  deleteLoyaltyCard,
};
