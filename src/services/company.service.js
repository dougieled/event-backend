const httpStatus = require('http-status');
const { Company } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a company
 * @param {Object} companyBody
 * @returns {Promise<Company>}
 */
const createCompany = async (req) => {
  req.body.userId = req.user.id;
  const dto = Company.create(req.body);
  return dto;
};

/**
 * Get company by id
 * @param {ObjectId} id
 * @returns {Promise<Company>}
 */
const getCompanyById = async (id) => {
  return Company.findById(id);
};

/**
 * Update company by id
 * @param {ObjectId} id
 * @param {Object} updateBody
 * @returns {Promise<Company>}
 */
const updateCompany = async (id, updateBody) => {
  const company = await getCompanyById(id);
  if (!company) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Company not found');
  }
  delete updateBody.id;
  delete updateBody.userId;
  Object.assign(company, updateBody);
  await company.save();
  return company;
};

/**
 * Delete company by id
 * @param {ObjectId} id
 * @returns {Promise<Company>}
 */
const deleteCompany = async (id) => {
  const company = await getCompanyById(id);
  if (!company) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Company not found');
  }
  await company.remove();
  return company;
};

const getAllCompanies = async (req) => {
  return Company.find({
    userId: req.user.id,
  });
};

module.exports = {
  createCompany,
  getCompanyById,
  updateCompany,
  deleteCompany,
  getAllCompanies,
};
