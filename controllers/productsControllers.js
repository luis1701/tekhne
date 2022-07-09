const { createProduct, getProducts, getProductById, deleteProductById, updateProduct } = require('../services/productServices')
const { successMessages, errorMessages } = require('../constants/messages')

exports.getProductsController = async (req, res, next) => {
  const products = await getProducts()
  res.status(200).json({ message: successMessages.products.get,  products: products });
}

exports.createProductController = async (req, res, next) => {
  const { body } = req;
  const newProduct = await createProduct(body)
  if (newProduct) {
    res.status(201).json({ message: successMessages.products.post, product: newProduct });
  } else {
    return res.status(422).json({
      message: errorMessages.products.post
    });
  }
}

exports.getProductByIdController = async (req, res, next) => {
  const { params } = req;
  const { id } = params;
  const product = await getProductById(id)
  if (product) {
    return res.status(200).json({ product: product });
  } else {
    return res.status(422).json({
      message: 'Invalid input, please enter a valid id.'
    });
  }
}

exports.deleteProductByIdController = async (req, res, next) => {
  const { params } = req;
  const { id } = params;
  // Obtenemos el elemento de la lista que queremos eliminar
  const deletedProduct = await deleteProductById(id)
  if (deletedProduct) {
    return res.status(200).json({ deleted: true, product: deletedProduct });
  } else {
    console.log(id, ' Producto con id no encontrado')
    return res.status(422).json({
      message: 'Invalid param id, please enter a valid id.'
    });
  }
}

exports.putProductController = async (req, res, next) => {
  const { body, params } = req;
  const { id } = params;

  const updatedProduct = await updateProduct(id, body)

  if (updatedProduct) {
    res.status(201).json({ message: 'Updated product.', product: updatedProduct });
  } else {
    console.log(id, ' Producto no encontrado')
    return res.status(422).json({
      message: 'Invalid param id, please enter a valid id.'
    });
  }
}