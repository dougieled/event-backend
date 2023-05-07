const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { exampleService } = require('../services');

const createExample = catchAsync(async (req, res) => {
  const example = await exampleService.createExample(req);
  res.status(httpStatus.CREATED).send(example);
});

const getExample = catchAsync(async (req, res) => {
  const example = await exampleService.getExampleById(req.params.id);
  if (!example) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Example not found');
  }
  res.send(example);
});

const updateExample = catchAsync(async (req, res) => {
  const example = await exampleService.updateExample(req.params.id, req.body);
  res.send(example);
});

const deleteExample = catchAsync(async (req, res) => {
  await exampleService.deleteExample(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});
const getAllExamples = catchAsync(async (req, res) => {
  const examples = await exampleService.getAllExamples(req);
  res.send(examples);
});

module.exports = {
  createExample,
  getExample,
  updateExample,
  deleteExample,
  getAllExamples,
};
