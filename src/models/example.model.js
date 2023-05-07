const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const exampleSchema = mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
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
exampleSchema.plugin(toJSON);
exampleSchema.plugin(paginate);

exampleSchema.pre('save', async function (next) {
  next();
});

/**
 * @typedef Example
 */
const Example = mongoose.model('Example', exampleSchema);

module.exports = Example;
