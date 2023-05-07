const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const loyaltyRedeemSchema = mongoose.Schema(
  {
    loyaltyCardId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    userLoyaltyIds: {
      type: String,
      required: true,
    },
    archived: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
loyaltyRedeemSchema.plugin(toJSON);
loyaltyRedeemSchema.plugin(paginate);

loyaltyRedeemSchema.pre('save', async function (next) {
  next();
});

/**
 * @typedef LoyaltyRedeem
 */
const LoyaltyRedeem = mongoose.model('LoyaltyRedeem', loyaltyRedeemSchema);

module.exports = LoyaltyRedeem;
