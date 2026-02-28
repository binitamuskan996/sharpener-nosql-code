const { getDb } = require('../utils/db-connection');
const { ObjectId } = require('mongodb');

class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
    this.cart = { items: [] };
  }

  save() {
    const db = getDb();
    return db.collection('users').insertOne(this);
  }

  static findUserById(userId) {
    const db = getDb();
    return db
      .collection('users')
      .findOne({ _id: new ObjectId(userId) });
  }

  static addToCart(userId, productId) {
    const db = getDb();

    return db.collection('users')
      .findOne({ _id: new ObjectId(userId) })
      .then(user => {

        const cartProductIndex = user.cart.items.findIndex(
          cp => cp.productId.toString() === productId.toString()
        );

        if (cartProductIndex >= 0) {
          user.cart.items[cartProductIndex].quantity += 1;
        } else {
          user.cart.items.push({
            productId: new ObjectId(productId),
            quantity: 1
          });
        }

        return db.collection('users').updateOne(
          { _id: new ObjectId(userId) },
          { $set: { cart: user.cart } }
        );
      });
  }

  static deleteFromCart(userId, productId) {
    const db = getDb();

    return db.collection('users')
      .findOne({ _id: new ObjectId(userId) })
      .then(user => {

        const updatedItems = user.cart.items.filter(
          item => item.productId.toString() !== productId.toString()
        );

        return db.collection('users').updateOne(
          { _id: new ObjectId(userId) },
          { $set: { cart: { items: updatedItems } } }
        );
      });
  }
}

module.exports = User;