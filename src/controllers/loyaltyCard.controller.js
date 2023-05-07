const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { loyaltyCardService } = require('../services');

const createLoyaltyCard = catchAsync(async (req, res) => {
  const dto = await loyaltyCardService.createLoyaltyCard(req);
  res.status(httpStatus.CREATED).send(dto);
});

const getLoyaltyCardByID = catchAsync(async (req, res) => {
  const dto = await loyaltyCardService.getLoyaltyCardById(req.params.id);
  if (!dto) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Loyalty Card not found');
  }
  res.send(dto);
});

const updateLoyaltyCard = catchAsync(async (req, res) => {
  const dto = await loyaltyCardService.updateLoyaltyCard(req.params.id, req.body);
  res.send(dto);
});

const deleteLoyaltyCard = catchAsync(async (req, res) => {
  await loyaltyCardService.deleteLoyaltyCard(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});
const getAllLoyaltyCards = catchAsync(async (req, res) => {
  const dtos = await loyaltyCardService.getAllLoyaltyCards(req);
  res.send(dtos);
});

module.exports = {
  createLoyaltyCard,
  getLoyaltyCardByID,
  updateLoyaltyCard,
  deleteLoyaltyCard,
  getAllLoyaltyCards,
};
