const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { healthService } = require('../services');

const healthCheck = catchAsync(async (req, res) => {
  const health = await healthService.healthCheck();
  res.status(httpStatus.OK).send(health);
});

module.exports = {
  healthCheck,
};
