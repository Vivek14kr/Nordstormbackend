const express = require('express')
const cors = require('cors')
const app = express();

const path = require("path");

app.use(express.json())
app.use(cors())

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
