const Customer = require('@models/auth/customer.model');
const APIError = require('@utils/APIError');

//TODO CLEAN THIS
exports.register = async (req, res, next) => {
  try {
    let { mobileDeviceInfo,fcmId, mobile, name ,gender,password } = req.body //MobileDevice info contains make fcmid and other shit
    mobileDeviceInfo={ fcmId : fcmId ? fcmId :""};
    let _customer = await Customer.getByMobile(mobile)
    if (!_customer) {
      if(!password){
        password = "password"
      }
      _customer = await Customer.create({ gender,mobileDeviceInfo, fcmId, mobile, name ,password })
      const { customer, accessToken } = await Customer.findAndGenerateToken({ mobile: _customer.mobile })
      res.json({
        message: "OK",
        customer,
        accessToken,
        existing: false,
      });
    } else {
      _customer.mobileDeviceInfo = mobileDeviceInfo
      _customer.mobile = mobile
      await _customer.save()
      const { customer, accessToken } = await Customer.findAndGenerateToken({ mobile: _customer.mobile })
      res.json({
        message: "OK",
        customer,
        accessToken,
        existing: true
      });
    }
  } catch (error) {
    next(error);
  }
};