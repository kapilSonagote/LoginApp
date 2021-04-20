const APIError = require('@utils/APIError');
const Customer = require('@models/auth/customer.model')

exports.loginCustomer = async (req, res, next) => {
   try {
     const { mobile, password } = req.body
     const { clientIp } = req
     const { customer, accessToken } = await Customer.loginfindAndGenerateToken({ mobile, password, ip: clientIp })
     return res.json({ customer, accessToken })
   } catch (error) {
     return next(new APIError(error));
   }
 }