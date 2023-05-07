const httpStatus = require('http-status');
const csv = require('fast-csv');
const fs = require('fs');
const moment = require('moment');
const { Transaction } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a transaction
 * @param {Object} transactionBody
 * @returns {Promise<Transaction>}
 */
const createTransaction = async (transactionBody) => {
  const dto = Transaction.create(transactionBody);
  return dto;
};

/**
 * Get transaction by id
 * @param {ObjectId} id
 * @returns {Promise<Transaction>}
 */
const getTransactionById = async (id) => {
  return Transaction.findById(id);
};

/**
 * Update transaction by id
 * @param {ObjectId} id
 * @param {Object} updateBody
 * @returns {Promise<Transaction>}
 */
const updateTransaction = async (id, updateBody) => {
  const transaction = await getTransactionById(id);
  if (!transaction) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Transaction not found');
  }
  delete updateBody.id;
  delete updateBody.userId;
  Object.assign(transaction, updateBody);
  await transaction.save();
  return transaction;
};

/**
 * Delete transaction by id
 * @param {ObjectId} id
 * @returns {Promise<Transaction>}
 */
const deleteTransaction = async (id) => {
  const transaction = await getTransactionById(id);
  if (!transaction) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Transaction not found');
  }
  await transaction.remove();
  return transaction;
};

/**
 * Get All transactions
 * @param {Boolean} isRequired
 * @returns {Promise<List<Transaction>>}
 */
const getAllTransactions = async (isDeposit) => {
  if (isDeposit === true) {
    return Transaction.find({ isDeposit: true });
  }
  if (isDeposit === false) {
    return Transaction.find({ isDeposit: false });
  }
  if (isDeposit === null) {
    return Transaction.find();
  }
};
const mapExcelToSchema = (data, userId) => {
  const dto = {
    timestamp: data['Timestamp (UTC)'], // mySqlDateTimeFormat,
    description: data['Transaction Description'],
    amount: data['Native Amount'],
    nativeCurrency: data['Native Currency'],
    isDeposit: data['Native Amount'] > 0,
    userId,
  };
  return dto;
};

/**
 * Create a transaction
 * @param {File} transactionBody
 */
const batchUpload = async (req) => {
  // save transaction
  const allTransactionsInDB = await getAllTransactions(null);
  const csvstream = csv
    .parseFile(req.file.path, { headers: true })
    .on('data', function (data) {
      csvstream.pause();
      const userId = req.user.id;
      const dto = mapExcelToSchema(data, userId);
      const doesTransactionAlreadyExist =
        allTransactionsInDB.filter(
          (x) =>
            moment(x.timestamp).isSame(moment(dto.timestamp)) &&
            x.description === dto.description &&
            parseFloat(x.amount) === parseFloat(dto.amount) &&
            x.userId === userId
        ).length > 0;
      // Checks if transaction exists already && checks if date is valid
      if (!doesTransactionAlreadyExist) {
        (async () => createTransaction(dto))();
      }
      csvstream.resume();
    })
    .on('end', function () {
      fs.unlinkSync(req.file.path); // remove temp file
    })
    .on('error', function (error) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
    });
};

/**
 * Reset my transactions
 * @param {ObjectId} id
 */
const resetMyTransactions = async (id) => {
  return Transaction.deleteMany({ userId: id });
};

const getAllMyTransactions = async (req) => {
  return Transaction.find({
    userId: req.user.id,
  });
};
const getAllMyTransactionsByMonth = async (req) => {
  const startOfMonth = moment(req.query.monthDate).startOf('month').format('YYYY-MM-DD  HH:mm:ss');
  const endOfMonth = moment(req.query.monthDate).endOf('month').format('YYYY-MM-DD  HH:mm:ss');
  return Transaction.find({
    timestamp: {
      $gte: startOfMonth,
      $lt: endOfMonth,
    },
    userId: {
      $eq: req.user.id,
    },
  });
};
const getAllMyTransactionsByWeek = async (req) => {
  const startOfDay = moment(req.query.startDate).startOf('day').format('YYYY-MM-DD HH:mm:ss');
  const endOfDay = moment(req.query.endDate).endOf('day').format('YYYY-MM-DD HH:mm:ss');
  return Transaction.find({
    timestamp: {
      $gte: startOfDay,
      $lte: endOfDay,
    },
    userId: {
      $eq: req.user.id,
    },
  });
};
const getAllMyTransactionsByDate = async (req) => {
  const startOfDay = moment(req.query.date).startOf('day').format('YYYY-MM-DD HH:mm:ss');
  const endOfDay = moment(req.query.date).endOf('day').format('YYYY-MM-DD HH:mm:ss');
  return Transaction.find({
    timestamp: {
      $gte: startOfDay,
      $lt: endOfDay,
    },
    userId: {
      $eq: req.user.id,
    },
  });
};

module.exports = {
  createTransaction,
  getTransactionById,
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
