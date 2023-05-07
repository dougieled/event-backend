const httpStatus = require('http-status');
const { Example } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a example
 * @param {Object} exampleBody
 * @returns {Promise<Example>}
 */
const createExample = async (req) => {
  req.body.userId = req.user.id;
  const dto = Example.create(req.body);
  return dto;
};

/**
 * Get example by id
 * @param {ObjectId} id
 * @returns {Promise<Example>}
 */
const getExampleById = async (id) => {
  return Example.findById(id);
};

/**
 * Update example by id
 * @param {ObjectId} id
 * @param {Object} updateBody
 * @returns {Promise<Example>}
 */
const updateExample = async (id, updateBody) => {
  const example = await getExampleById(id);
  if (!example) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Example not found');
  }
  delete updateBody.id;
  delete updateBody.userId;
  Object.assign(example, updateBody);
  await example.save();
  return example;
};

/**
 * Delete example by id
 * @param {ObjectId} id
 * @returns {Promise<Example>}
 */
const deleteExample = async (id) => {
  const example = await getExampleById(id);
  if (!example) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Example not found');
  }
  await example.remove();
  return example;
};

const getAllExamples = async (req) => {
  return Example.find({
    userId: req.user.id,
  });
};

module.exports = {
  createExample,
  getExampleById,
  updateExample,
  deleteExample,
  getAllExamples,
};
