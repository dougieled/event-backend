const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

/**
 * Get Health Check
 * @returns {Promise<{uptime:number,message:string,timestamp:Date}>}
 */
const healthCheck = async () => {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
  };
  try {
    return healthcheck;
  } catch (error) {
    throw new ApiError(httpStatus.SERVICE_UNAVAILABLE, error);
  }
};

module.exports = {
  healthCheck,
};
