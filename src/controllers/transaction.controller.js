const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { transactionService } = require('../services');

const createTransaction = catchAsync(async (req, res) => {
  const transaction = await transactionService.createTransaction(req.body);
  res.status(httpStatus.CREATED).send(transaction);
});

const getTransaction = catchAsync(async (req, res) => {
  const transaction = await transactionService.getTransactionById(req.params.id);
  if (!transaction) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Transaction not found');
  }
  res.send(transaction);
});

const updateTransaction = catchAsync(async (req, res) => {
  const transaction = await transactionService.updateTransaction(req.params.id, req.body);
  res.send(transaction);
});

const deleteTransaction = catchAsync(async (req, res) => {
  await transactionService.deleteTransaction(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});
const getAllTransactions = catchAsync(async (req, res) => {
  await transactionService.getAllTransactions(req.params.isDeposit);
  res.send();
});
const batchUpload = catchAsync(async (req, res) => {
  await transactionService.batchUpload(req);
  res.status(httpStatus.CREATED).send();
});
const resetMyTransactions = catchAsync(async (req, res) => {
  await transactionService.resetMyTransactions(req.user.id);
  res.status(httpStatus.NO_CONTENT).send();
});
const getAllMyTransactions = catchAsync(async (req, res) => {
  const transactions = await transactionService.getAllMyTransactions(req);
  res.send(transactions);
});
const getAllMyTransactionsByMonth = catchAsync(async (req, res) => {
  const transactions = await transactionService.getAllMyTransactionsByMonth(req);
  res.send(transactions);
});
const getAllMyTransactionsByWeek = catchAsync(async (req, res) => {
  const transactions = await transactionService.getAllMyTransactionsByWeek(req);
  res.send(transactions);
});
const getAllMyTransactionsByDate = catchAsync(async (req, res) => {
  const transactions = await transactionService.getAllMyTransactionsByDate(req);
  res.send(transactions);
});

module.exports = {
  createTransaction,
  getTransaction,
  updateTransaction,
  deleteTransaction,
  getAllTransactions,
  batchUpload,
  resetMyTransactions,
  getAllMyTransactions,
  getAllMyTransactionsByMonth,
  getAllMyTransactionsByWeek,
  getAllMyTransactionsByDate,
};
