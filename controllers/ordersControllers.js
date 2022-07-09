const { createOrder, getOrders, updateOrder, getOrderById, deleteOrderById } = require('../services/orderServices')
const { successMessages, errorMessages } = require('../constants/messages')

exports.createOrderController = async (req, res, next) => {
    const { body } = req;
    const newOrder = await createOrder(body)
    if (newOrder) {
      res.status(201).json({ message: successMessages.orders.post, order: newOrder });
    } else {
      return res.status(422).json({
        message: errorMessages.orders.post
      });
    }
}

exports.getOrdersController = async (req, res, next) => {
  const orders = await getOrders()
  res.status(200).json({ message: successMessages.orders.get,  orders: orders });
}

exports.updateOrderController = async (req, res, next) => {
  const { body, params } = req;
  const { id } = params;

  const updatedOrder = await updateOrder(id, body)

  if (updatedOrder) {
    res.status(201).json({ message: 'Updated order.', order: updatedOrder });
  } else {
    console.log(id, ' Orden no encontrada')
    return res.status(422).json({
      message: 'Invalid param id, please enter a valid id.'
    });
  }
}

exports.getOrderByIdController = async (req, res, next) => {
  const { params } = req;
  const { id } = params;
  const order = await getOrderById(id)
  if (order) {
    return res.status(200).json({ order: order });
  } else {
    return res.status(422).json({
      message: 'Invalid input, please enter a valid id.'
    });
  }
}

exports.deleteOrderByIdController = async (req, res, next) => {
  const { params } = req;
  const { id } = params;
  const deletedOrder = await deleteOrderById(id)
  if (deletedOrder) {
    return res.status(200).json({ deleted: true, product: deletedOrder });
  } else {
    console.log(id, ' Order con id no encontrado')
    return res.status(422).json({
      message: 'Invalid param id, please enter a valid id.'
    });
  }
}
