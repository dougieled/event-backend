const httpStatus = require('http-status');
const { LoyaltyRedeem } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a loyaltyRedeem
 * @param {Object} loyaltyRedeemBody
 * @returns {Promise<LoyaltyRedeem>}
 */
const createLoyaltyRedeem = async (req) => {
  const dto = LoyaltyRedeem.create(req.body);
  return dto;
};

/**
 * Get loyaltyRedeem by id
 * @param {ObjectId} id
 * @returns {Promise<LoyaltyRedeem>}
 */
const getLoyaltyRedeemById = async (id) => {
  return LoyaltyRedeem.findById(id);
};

/**
 * Update loyaltyRedeem by id
 * @param {ObjectId} id
 * @param {Object} updateBody
 * @returns {Promise<LoyaltyRedeem>}
 */
const updateLoyaltyRedeem = async (id, updateBody) => {
  const loyaltyRedeem = await getLoyaltyRedeemById(id);
  if (!loyaltyRedeem) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Loyalty Redeem not found');
  }
  delete updateBody.id;
  Object.assign(loyaltyRedeem, updateBody);
  await loyaltyRedeem.save();
  return loyaltyRedeem;
};

/**
 * Delete loyaltyRedeem by id
 * @param {ObjectId} id
 * @returns {Promise<LoyaltyRedeem>}
 */
const deleteLoyaltyRedeem = async (id) => {
  const loyaltyRedeem = await getLoyaltyRedeemById(id);
  if (!loyaltyRedeem) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Loyalty Redeem not found');
  }
  await loyaltyRedeem.remove();
  return loyaltyRedeem;
};

module.exports = {
  createLoyaltyRedeem,
  getLoyaltyRedeemById,
  updateLoyaltyRedeem,
  deleteLoyaltyRedeem,
};
