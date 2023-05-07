const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createLoyaltyRedeem = {
  body: Joi.object().keys({
    loyaltyCardId: Joi.string().required(),
    userId: Joi.string().required(),
    description: Joi.string(),
    type: Joi.string(),
    rewardCount: Joi.number().required(),
    companyId: Joi.string().required().custom(objectId),
  }),
};

const getLoyaltyRedeem = {
  query: Joi.object().keys({
    userId: Joi.string(),
    loyaltyCardId: Joi.string(),
    active: Joi.boolean(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getLoyaltyRedeemByID = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const deleteLoyaltyRedeem = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createLoyaltyRedeem,
  getLoyaltyRedeem,
  getLoyaltyRedeemByID,
  deleteLoyaltyRedeem,
};
