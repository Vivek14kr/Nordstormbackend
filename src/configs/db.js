const mongoose = require('mongoose')

require("dotenv").config();

module.exports = () => {
  return mongoose.connect(
    "mongodb+srv://Vivek14kr:1HqOiJ5BQivV75gP@cluster0.tfkryts.mongodb.net/Nordstorm", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((res)=> console.log("connected")).catch((err) => console.log("eror: ", err));
    
  
}
