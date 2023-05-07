const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { companyService } = require('../services');

const createCompany = catchAsync(async (req, res) => {
  const example = await companyService.createCompany(req);
  res.status(httpStatus.CREATED).send(example);
});

const getCompanyByID = catchAsync(async (req, res) => {
  const example = await companyService.getCompanyById(req.params.id);
  if (!example) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Company not found');
  }
  res.send(example);
});

const updateCompany = catchAsync(async (req, res) => {
  const example = await companyService.updateCompany(req.params.id, req.body);
  res.send(example);
});

const deleteCompany = catchAsync(async (req, res) => {
  await companyService.deleteCompany(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});
const getAllCompanies = catchAsync(async (req, res) => {
  const examples = await companyService.getAllCompanies(req);
  res.send(examples);
});

module.exports = {
  createCompany,
  getCompanyByID,
  updateCompany,
  deleteCompany,
  getAllCompanies,
};
