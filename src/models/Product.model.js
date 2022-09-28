
const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter product Name"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Please Enter product Price"],
    maxLength: [8, "Price cannot exceed 8 characters"],
  },

  description: {
    type: String,
    required: [true, "Please Enter Product Description"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: 
     {
      type: String,
      required: [true, "Please Enter Produc images"],
    },
  

  category: {
    type: String,
    required: [true, "Please Enter Product Category"],
  },
  brand: {
    type: String,
    required: [true, "Please Enter Product Brand"],
  },
  gender: {
    type: String,
    required: [true, "Please Enter Gender"],
  },
  companydetails: {
    type: String,
    required: [true, "Please Enter company Details"],
  },
  
  sizeinfo: {
    type: String,
    required: [true, "Please Enter size Info"],
  },
  

  Stock: {
    type: Number,
    required: [true, "Please Enter product Stock"],
    
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
 


  createdAt: {
    type: Date,
    default: Date.now,
  },

  
});

module.exports = mongoose.model("Product", productSchema);
