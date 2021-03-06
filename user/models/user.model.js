const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const hashPasswordHelper = require("../helpers/hashPassword.helper");

const userSchema = new mongoose.Schema({
  name: {
    type: String
  },
  phone: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  avatar: {
    type: String,
    default: '/img/user.png'
  },
  password: {
    type: String
  },
  roles: {
    type: [String],
    default: ['buyer']
  },
  state: {
    value: {
      type: String,
      enum: ['active', 'inactive', 'deleted'],
      default: 'active'
    },
    token: {
      content: {
        type: String,
        default: null
      },
      generatedAt: {
        type: Date,
        default: null
      }
    },
    security: {
      question: {
        type: String,
        default: null
      },
      answer: {
        type: String,
        default: null
      }
    }
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

userSchema.pre('save', async function (next) {
  const user = this;

  if (!user.isModified('password'))
    return next();

  try {
    const hash = await hashPasswordHelper(user.password);
    user.password = hash;

    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);

    return isMatch;
  } catch (error) {
    return error;
  }
};

const userModel = mongoose.model('User', userSchema, 'users');

module.exports = userModel;