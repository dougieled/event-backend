const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userLoyaltyCardService } = require('../services');

const createUserLoyaltyCard = catchAsync(async (req, res) => {
  const dto = await userLoyaltyCardService.createUserLoyaltyCard(req);
  res.status(httpStatus.CREATED).send(dto);
});

const getUserLoyaltyCardByID = catchAsync(async (req, res) => {
  const dto = await userLoyaltyCardService.getUserLoyaltyCardById(req.params.id);
  if (!dto) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Loyalty Card not found');
  }
  res.send(dto);
});

const updateUserLoyaltyCard = catchAsync(async (req, res) => {
  const dto = await userLoyaltyCardService.updateUserLoyaltyCard(req.params.id, req.body);
  res.send(dto);
});

const deleteUserLoyaltyCard = catchAsync(async (req, res) => {
  await userLoyaltyCardService.deleteUserLoyaltyCard(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});
const getAllByLoyaltyCardId = catchAsync(async (req, res) => {
  const dtos = await userLoyaltyCardService.getAllByLoyaltyCardId(req);
  res.send(dtos);
});
const getLoyaltyCount = catchAsync(async (req, res) => {
  const dtos = await userLoyaltyCardService.getLoyaltyCount(req);
  res.send(dtos);
});

module.exports = {
  createUserLoyaltyCard,
  getUserLoyaltyCardByID,
  updateUserLoyaltyCard,
  deleteUserLoyaltyCard,
  getAllByLoyaltyCardId,
  getLoyaltyCount,
};
