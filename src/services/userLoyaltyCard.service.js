const httpStatus = require('http-status');
const { UserLoyaltyCard, LoyaltyCard, LoyaltyRedeem } = require('../models');
const ApiError = require('../utils/ApiError');

const handleCreatingLoyaltyRedeem = async (req) => {
  const loyaltyCardDetails = await LoyaltyCard.findById(req.params.loyaltyCardId);
  const array = await UserLoyaltyCard.find({
    userId: req.user.id,
    loyaltyCardId: req.params.loyaltyCardId,
    archived: false,
  });
  if (array.length === loyaltyCardDetails.rewardCount) {
    await UserLoyaltyCard.updateMany(
      {
        userId: req.user.id,
        loyaltyCardId: req.params.loyaltyCardId,
        archived: false,
      },
      { $set: { archived: true } }
    );
    await LoyaltyRedeem.create({
      userId: req.user.id,
      loyaltyCardId: req.params.loyaltyCardId,
      userLoyaltyIds: array.map((x) => x.id).join(','),
    });
  }
};

/**
 * Create a userLoyaltyCard
 * @param {Object} userLoyaltyCardBody
 * @returns {Promise<UserLoyaltyCard>}
 */
const createUserLoyaltyCard = async (req) => {
  const dto = { userId: req.user.id, loyaltyCardId: req.params.loyaltyCardId };
  const newDto = await UserLoyaltyCard.create(dto);
  handleCreatingLoyaltyRedeem(req);
  return newDto;
};

/**
 * Get userLoyaltyCard by id
 * @param {ObjectId} id
 * @returns {Promise<UserLoyaltyCard>}
 */
const getUserLoyaltyCardById = async (id) => {
  return UserLoyaltyCard.findById(id);
};

/**
 * Update userLoyaltyCard by id
 * @param {ObjectId} id
 * @param {Object} updateBody
 * @returns {Promise<UserLoyaltyCard>}
 */
const updateUserLoyaltyCard = async (id, updateBody) => {
  const userLoyaltyCard = await getUserLoyaltyCardById(id);
  if (!userLoyaltyCard) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Loyalty Card not found');
  }
  delete updateBody.id;
  Object.assign(userLoyaltyCard, updateBody);
  await userLoyaltyCard.save();
  return userLoyaltyCard;
};

/**
 * Delete userLoyaltyCard by id
 * @param {ObjectId} id
 * @returns {Promise<UserLoyaltyCard>}
 */
const deleteUserLoyaltyCard = async (id) => {
  const userLoyaltyCard = await getUserLoyaltyCardById(id);
  if (!userLoyaltyCard) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Loyalty Card not found');
  }
  await userLoyaltyCard.remove();
  return userLoyaltyCard;
};

const getAllByLoyaltyCardId = async (req) => {
  return UserLoyaltyCard.find({ userId: req.user.id, loyaltyCardId: req.params.loyaltyCardId });
};

const getLoyaltyCount = async (req) => {
  const loyaltyCardDetails = await LoyaltyCard.findById(req.params.loyaltyCardId);
  const array = await UserLoyaltyCard.find({ userId: req.user.id, loyaltyCardId: req.params.loyaltyCardId });
  const newArray = array.slice(loyaltyCardDetails.rewardCount);
  const result = {
    count: newArray.length,
    rewardTotal: loyaltyCardDetails.rewardCount,
    // If length is equal to reward count && array is not empty
    isFree: newArray.length === loyaltyCardDetails.rewardCount && array.length !== 0,
  };
  return result;
};

module.exports = {
  createUserLoyaltyCard,
  getUserLoyaltyCardById,
  updateUserLoyaltyCard,
  deleteUserLoyaltyCard,
  getAllByLoyaltyCardId,
  getLoyaltyCount,
};
