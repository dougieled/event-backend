const httpStatus = require('http-status');
const { LoyaltyCard, Company } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a loyaltyCard
 * @param {Object} loyaltyCardBody
 * @returns {Promise<LoyaltyCard>}
 */
const createLoyaltyCard = async (req) => {
  const dto = LoyaltyCard.create(req.body);
  return dto;
};

/**
 * Get loyaltyCard by id
 * @param {ObjectId} id
 * @returns {Promise<LoyaltyCard>}
 */
const getLoyaltyCardById = async (id) => {
  return LoyaltyCard.findById(id);
};

/**
 * Update loyaltyCard by id
 * @param {ObjectId} id
 * @param {Object} updateBody
 * @returns {Promise<LoyaltyCard>}
 */
const updateLoyaltyCard = async (id, updateBody) => {
  const loyaltyCard = await getLoyaltyCardById(id);
  if (!loyaltyCard) {
    throw new ApiError(httpStatus.NOT_FOUND, 'LoyaltyCard not found');
  }
  delete updateBody.id;
  delete updateBody.companyId;
  Object.assign(loyaltyCard, updateBody);
  await loyaltyCard.save();
  return loyaltyCard;
};

/**
 * Delete loyaltyCard by id
 * @param {ObjectId} id
 * @returns {Promise<LoyaltyCard>}
 */
const deleteLoyaltyCard = async (id) => {
  const loyaltyCard = await getLoyaltyCardById(id);
  if (!loyaltyCard) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Loyalty Card not found');
  }
  await loyaltyCard.remove();
  return loyaltyCard;
};

const getAllLoyaltyCards = async (req) => {
  const companies = await Company.find({ userId: req.user.id });
  return LoyaltyCard.find({ companyId: { $in: companies.map((x) => x.id) } });
};

module.exports = {
  createLoyaltyCard,
  getLoyaltyCardById,
  updateLoyaltyCard,
  deleteLoyaltyCard,
  getAllLoyaltyCards,
};
