const express = require('express');
const bodyParser = require('body-parser');

const mongoConnect = require('./utils/db-connection').mongoConnect;
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(bodyParser.json());

app.use(userRoutes);
app.use(productRoutes);

mongoConnect(() => {
  app.listen(3000, () => {
    console.log('Server running on port 3000');
  });
});