const { createCustomer } = require('../services/customerServices')
const { successMessages, errorMessages } = require('../constants/messages')

exports.createCustomerController = async (req, res, next) => {
  const { body } = req;
  const newCustomer = await createCustomer(body);
  if (newCustomer) {
    res.status(201).json({ message: successMessages.customers.post, customer: newCustomer });
  } else {
    return res.status(422).json({
      message: errorMessages.customers.post
    });
  }
}