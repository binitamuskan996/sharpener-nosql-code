const Product = require('../models/productModel');
const User = require('../models/userModel');

exports.addProduct = (req, res) => {
  const { title, price, description, userId } = req.body;

  const product = new Product(title, price, description, userId);

  product.save()
    .then(() => {
      res.json({ message: "Product added" });
    });
};

exports.getProducts = (req, res) => {
  Product.fetchAll()
    .then(products => {
      res.json(products);
    });
};

exports.getSingleProduct = (req, res) => {
  const prodId = req.params.productId;

  Product.findById(prodId)
    .then(product => {
      res.json(product);
    });
};

exports.updateProduct = (req, res) => {
  const prodId = req.params.productId;
  const payload = req.body;

  Product.update(prodId, payload)
    .then(() => {
      res.json({ message: "Product updated" });
    });
};

exports.deleteProduct = (req, res) => {
  const prodId = req.params.productId;

  Product.delete(prodId)
    .then(() => {
      res.json({ message: "Product deleted" });
    });
};

exports.addToCart = (req, res) => {
  const { userId, productId } = req.body;

  User.addToCart(userId, productId)
    .then(() => {
      res.json({ message: "Added to cart" });
    });
};

exports.deleteCartItem = (req, res) => {
  const { userId, productId } = req.body;

  User.deleteFromCart(userId, productId)
    .then(() => {
      res.json({ message: "Item removed from cart" });
    });
};