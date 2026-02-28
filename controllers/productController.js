const Product = require('../models/productModel');
const User = require('../models/userModel');
const Order = require('../models/orderModel');
const { ObjectId } = require('mongodb');

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

exports.placeOrder = (req, res) => {
  const { userId } = req.body;

  User.findUserById(userId)
    .then(user => {

      const order = new Order(userId, user.cart.items);

      return order.save()
        .then(() => {
          return require('../utils/db-connection')
            .getDb()
            .collection('users')
            .updateOne(
              { _id: new ObjectId(userId) },
              { $set: { cart: { items: [] } } }
            );
        });
    })
    .then(() => {
      res.json({ message: "Order placed successfully" });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error placing order" });
    });
};

exports.getOrders = (req, res) => {
  const userId = req.params.userId;

  Order.fetchByUserId(userId)
    .then(orders => {
      console.log(orders);
      res.json(orders);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error fetching orders" });
    });
};