const { createProductDB, getProductsDB, getProductByIdDB, deleteProductByIdDB, updateProductDB } = require('../dataAccess/products')

exports.createProduct = async (data) => {
  const { title, price } = data
  const createdProduct = {
    title,
    price
  };
  const res = await createProductDB(createdProduct)
  if (res) {
    return createdProduct
  } else {
    return false
  }
}

exports.getProducts = async () => {
  const products = await getProductsDB()
  console.log(products)
  return products
}

exports.getProductById = async (id) => {
  const product = await getProductByIdDB(id)
  if (product) {
    return { id: product._id, title: product.title, price: product.price }
  }
  return product
}

exports.deleteProductById = async (id) => {
  const product = await this.getProductById(id)
  if (product) {
    await deleteProductByIdDB(id)
    return product
  }
  return null
}

exports.updateProduct = async (id, productData) => {
  const product = await this.getProductById(id)
  if (product) {
    const { title, price } = productData;
    const updatedProduct = {
      title,
      price
    };
    await updateProductDB(id, updatedProduct)
    return updatedProduct
  }
  return null
}