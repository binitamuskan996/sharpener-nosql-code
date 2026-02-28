const { getDb } = require('../utils/db-connection');
const { ObjectId } = require('mongodb');

class Order {
  constructor(userId, items) {
    this.userId = new ObjectId(userId);
    this.items = items;
  }

  save() {
    const db = getDb();
    return db.collection('orders').insertOne(this);
  }

  static fetchByUserId(userId) {
    const db = getDb();
    return db.collection('orders')
      .find({ userId: new ObjectId(userId) })
      .toArray();
  }
}

module.exports = Order;