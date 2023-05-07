const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const companySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    active: {
      type: Boolean,
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
companySchema.plugin(toJSON);
companySchema.plugin(paginate);

companySchema.pre('save', async function (next) {
  next();
});

/**
 * @typedef Example
 */
const Company = mongoose.model('Company', companySchema);

module.exports = Company;
