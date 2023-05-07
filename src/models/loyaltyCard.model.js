const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const loyaltyCardSchema = mongoose.Schema(
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
    type: {
      type: String,
      required: false,
      trim: true,
    },
    rewardCount: {
      type: Number,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
      required: true,
    },
    companyId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
loyaltyCardSchema.plugin(toJSON);
loyaltyCardSchema.plugin(paginate);

loyaltyCardSchema.pre('save', async function (next) {
  next();
});

/**
 * @typedef LoyaltyCard
 */
const LoyaltyCard = mongoose.model('LoyaltyCard', loyaltyCardSchema);

module.exports = LoyaltyCard;
