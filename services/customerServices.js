const { createCustomerDB, getCustomerByMail  } = require('../dataAccess/customer');
const { validateEmail } = require('../helpers/validateEmail');

exports.createCustomer = async (data) => {
  try {
    const { name, phone, email } = data;
    const createdCustomer = {
      name,
      phone,
      email
    };

    customerValidated = validateEmail(email);

    customerExist = await getCustomerByMail(email);

    if(customerExist || !customerValidated) return false; 

    const res = await createCustomerDB(createdCustomer);
    
    if (res) {
      return createdCustomer;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }  
}