const { createOrderDB, getOrdersDB, getOrderByIdDB, updateOrderDB } = require('../dataAccess/orders')
const { ObjectId } = require('mongodb');
const { getProducts } = require('./productServices')
const _ = require('lodash')

function validateType(type) {
  if (type !== 'PICKUP' && type !== 'TAKEAWAY') {
    return false
  }
  return true
}

async function validateProducts (products) {
  try {
    // Get all products from db
  const allProducts = await getProducts()

  // Process all products from db in order to get only the ids at the array
  const allProductsIds = _.map(allProducts, (product) => {
    return product.id.toString()
  })

  // Validate that products in order exists in db
  let isProductsValid = true

  for (let index = 0; index < products.length; index++) {
    const element = products[index];
    const id = new ObjectId(element)
    if (!allProductsIds.includes(id.toString())) {
      isProductsValid = false
      break
    }
  }
  return isProductsValid
  } catch (error) {
    console.log(error)
    return false
  }
}

exports.createOrder = async (data) => {
  try {
    const { products, type, date, customer } = data
    // Validate the type
    if (!validateType(type)) {
      return false
    }

    const validProducts = await validateProducts(products);

    // Validate products
    if (!validProducts) {
      console.log("Products in order are not valid")
      return false
    }

    // In this point we can be sure that data is right
    const createdOrder = {
        products, type, date, customer
    };
    const res = await createOrderDB(createdOrder)
    if (res) {
      return createdOrder
    } else {
      return false
    }
  } catch (error) {
    console.log(error)
    return false
  }
}

exports.getOrders = async () => {
  const orders = await getOrdersDB()
  console.log(orders)
  return orders
}

exports.getOrderById = async (id) => {
  const order = await getOrderByIdDB(id)
  if (order) {
    return {
      id: order._id,
      products: order.products,
      type: order.type,
      date: order.date,
      customer: order.customer
    }
  }
  return order
}

exports.updateOrder = async (id, orderData) => {
  const {
    products,
    type,
    date,
    customer
  } = orderData;

  // Validate the type
  if (!validateType(type)) {
    return null
  }

  const validProducts = await validateProducts(products);

  // Validate products
  if (!validProducts) {
    console.log("Products in order are not valid")
    return null
  }
  const order = await this.getOrderById(id)
  if (order) {
    const updatedOrder = {
      products,
      type,
      date,
      customer
    };
    await updateOrderDB(id, updatedOrder)
    return updatedOrder
  }
  return null
}