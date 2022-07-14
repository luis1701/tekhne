const { errorMessages } = require('../constants/messages');

exports.validProductData = (req, res, next) => {
  try {
    const { body } = req;
    const { title, price } = body;
    if (!title || title.trim().length === 0 || !price || price <= 0) {
      return res.status(422).json({
        message: errorMessages.products.post
      });
    }
    next();
  } catch (error) {
    return res.status(422).json({
      message: errorMessages.products.post
    });
  }
}

exports.validOrderData = (req, res, next) => {
  try {
    const { body } = req;
    const { products, type, date, customer } = body;
    if (!type || type.trim().length === 0 || !date || type.trim().length === 0) {
      return res.status(422).json({
        message: errorMessages.orders.post
      });
    }
    const { name, phone } = customer || {}
    if (!Array.isArray(products) && !name || name.trim().length === 0 || !phone || phone.trim().length === 0) {
      return res.status(422).json({
        message: errorMessages.orders.post
      });
    }
    next();
  } catch (error) {
    return res.status(422).json({
      message: errorMessages.orders.post
    });
  }
}

exports.validCustomerData = (req, res, next) => {
  try {
    const { body } = req;
    const { name, phone, email } = body;

    if ( !name || name.trim().length === 0 || !phone || typeof phone !== 'number' || phone < 1) {
      return res.status(422).json({
        message: errorMessages.customers.post
      });
    }
    if ( !email || email.trim().length === 0 || typeof email !== 'string') {
      return res.status(422).json({
        message: errorMessages.customers.post
      });
    }
   
    next();
  } catch (error) {
    console.error(error);
    return res.status(422).json({
      message: errorMessages.customers.post
    })
  }
}
exports.validCategoriesData = (req, res, next) => {
  try {
    const { body } = req;
    const { name, modifier } = body;
    console.log(name.trim().length)
    console.log(modifier)
    if (!name || name.trim().length === 0 || typeof modifier !== 'boolean') {
      return res.status(422).json({
        message: errorMessages.categories.post+"1" 
      });
    }
    const { tags } = body || {}
    if (!Array.isArray(tags)) {
      return res.status(422).json({
        message: errorMessages.categories.post+"2"
      });
    }
    next();
  } catch (error) {
    return res.status(422).json({
      message: errorMessages.categories.post+"3"
    });
  }
}
