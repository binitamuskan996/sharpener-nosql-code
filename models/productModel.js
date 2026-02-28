const { getDb } = require('../utils/db-connection');
const { ObjectId } = require('mongodb');

class Product {
  constructor(title, price, description, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.userId = new ObjectId(userId);
  }

  save() {
    const db = getDb();
    return db.collection('products').insertOne(this);
  }

  static fetchAll() {
    const db = getDb();
    return db.collection('products').find().toArray();
  }

  static findById(prodId) {
    const db = getDb();
    return db.collection('products')
      .findOne({ _id: new ObjectId(prodId) });
  }

  static update(prodId, payload) {
  const db = getDb();

  return db.collection('products').updateOne(
    { _id: new ObjectId(prodId) },
    { $set: payload }
  );
}

  static delete(prodId) {
    const db = getDb();
    return db.collection('products')
      .deleteOne({ _id: new ObjectId(prodId) });
  }
}

module.exports = Product;