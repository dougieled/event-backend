const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createUserLoyaltyCard = {
  body: Joi.object(),
};

const getUserLoyaltyCards = {
  query: Joi.object().keys({
    active: Joi.boolean(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUserLoyaltyCardByID = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateUserLoyaltyCard = {
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
  createUserLoyaltyCard,
  getUserLoyaltyCards,
  getUserLoyaltyCardByID,
  updateUserLoyaltyCard,
  deleteLoyaltyCard,
};
