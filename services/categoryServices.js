const { createCategoryDB } = require('../dataAccess/categories')
const { getCategoryByName } = require('../dataAccess/categories')

exports.createCategory = async (data) => {
  try {
    const { name, modifier, tags } = data

    const createdCategory = {
        name, modifier, tags
    };

    categoryExist = await getCategoryByName(name);
    if(categoryExist){
      return false;
    }

    const res = await createCategoryDB(createdCategory)
    if (res) {
      return createdCategory
    } else {
      return false
    }
  } catch (error) {
    console.log(error)
    return false
  }
}