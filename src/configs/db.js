const mongoose = require('mongoose')

let k = require('dotenv').config()

module.exports = () => {
  return mongoose.connect(k.parsed.MONGO_URI);
}


