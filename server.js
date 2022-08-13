const express = require('express');
const bodyParser = require('body-parser');
const productsRoutes = require('./routes/productsRoutes')
const ordersRoutes = require('./routes/ordersRoutes')
const customerRoutes = require('./routes/customerRoutes')
const categoriesRoutes = require('./routes/categoriesRoutes')
const citiesRoutes = require('./routes/citiesRoutes')
const authRoutes = require('./routes/authRoutes')

const app = express();

app.use(bodyParser.json());

// CORS Headers => Required for cross-origin/ cross-server communication
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.use(productsRoutes)
app.use(ordersRoutes)
app.use(customerRoutes)
app.use(categoriesRoutes)
app.use(citiesRoutes)
app.use(authRoutes)

app.listen(8083); // start Node + Express server on port 8080
