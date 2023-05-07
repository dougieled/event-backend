const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const userLoyaltyCardSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    loyaltyCardId: {
      type: String,
      required: true,
    },
    archived: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
userLoyaltyCardSchema.plugin(toJSON);
userLoyaltyCardSchema.plugin(paginate);

userLoyaltyCardSchema.pre('save', async function (next) {
  next();
});

/**
 * @typedef UserLoyaltyCard
 */
const UserLoyaltyCard = mongoose.model('UserLoyaltyCard', userLoyaltyCardSchema);

module.exports = UserLoyaltyCard;
