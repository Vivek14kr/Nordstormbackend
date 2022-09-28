const express = require('express')
const cors = require('cors')
const app = express();

const path = require("path");

app.use(express.json())
app.use(cors())



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
  images: {
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

let Product = mongoose.model("Product", productSchema);

const ApiFeatures = require("./utils/apifeatures");

const registerController = require('./controllers/register.controller');
const loginController = require('./controllers/login.controller');
const cartController = require('./controllers/Cart.controller');


app.post("/products/", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    return res.status(200).send(product);
  } catch (e) {
    return res.status(500).json({ status: "Failed", message: e.message });
  }
});

app.get("/products/", async (req, res) => {
  try {
    const resultPerPage = 24;
    const productsCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerPage);

    let products = await apiFeature.query;

    let filteredProductsCount = products.length;

    res.status(200).json({
      products,
      productsCount,
      resultPerPage,
      filteredProductsCount,
    });
  } catch (e) {
    return res.status(500).json({ status: "Failled", message: e.message });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    return res.status(200).send(product);
  } catch (e) {
    return res.status(500).json({ status: "Failled", message: e.message });
  }
});

app.use('/register', registerController);
app.use('/login', loginController);

app.use('/cart', cartController);

app.use("/", require("./controllers/noteRoute.controller"));


module.exports = app
