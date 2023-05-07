const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const transactionSchema = mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    nativeCurrency: {
      type: String,
      required: true,
    },
    isDeposit: {
      type: Boolean,
      required: true,
    },
    timestamp: {
      type: Date,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
transactionSchema.plugin(toJSON);
transactionSchema.plugin(paginate);

transactionSchema.pre('save', async function (next) {
  next();
});

/**
 * @typedef Transaction
 */
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
