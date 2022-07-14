const { createCategory } = require('../services/categoryServices')
const { successMessages, errorMessages } = require('../constants/messages')

exports.createCategoriesController = async (req, res, next) => {
    const { body } = req;
    const newCategory = await createCategory(body)
    if (newCategory) {
      res.status(201).json({ message: successMessages.categories.post, category: newCategory });
    } else {
      return res.status(422).json({
        message: errorMessages.categories.post
      });
    }
}