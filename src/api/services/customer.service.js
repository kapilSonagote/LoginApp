const Customer = require('@models/auth/customer.model')
const APIError = require('@utils/APIError');

exports.findOrCreate = async (mobile, firstName, lastName) => {
   try {
      const { number, countryCode } = mobile
      let customer
      customer = await Customer.findOne({ 'mobile.number': number, 'mobile.countryCode': countryCode })
      if (customer) {
         return customer
      } else {
         customer = new Customer({ mobile, firstName, lastName })
         const savedCustomer = await customer.save()
         return savedCustomer.transform()
      }
   } catch (error) {
      throw error
   }
}

exports.getCustomerList = async ({ page = 1, perPage = 30, search }) => {
   try {
      let queryArr = []
      if (search && search.length > 0) {
         queryArr.push({ firstName: { $regex: search, $options: 'i' } })
         queryArr.push({ "mobile.number": { $regex: search, $options: 'i' } })
         queryArr.push({ lastName: { $regex: search, $options: 'i' } })
      } else {
         queryArr.push({})
      }
      let customers = await Customer.find({ $or: queryArr }).sort({ createdAt: -1 })
         .skip(perPage * (page * 1 - 1))
         .limit(perPage * 1)
      return customers
   } catch (error) {
      throw error
   }
}

exports.load = async (req, res, next) => {
   try {
      const { entity } = req.session
      const customer = await Customer.get(entity)
      req.locals.customer = customer;
      return next()
   } catch (error) {
      return next(error)
   }
}


exports.setCustomerById = async ({id}) => {
   try {
      let customer
      customer = await Customer.findById(id)
      if (customer) {
         return customer.transform()
      }
      else{
         throw {message:"Customer not found"}
      }
   } catch (error) {
      throw error
   }
}


exports.addPartnerToLoggedInUser = async (req, res, next) => {
   try {
      const { entity } = req.session
      const { _partner } = req.locals
      const customer = await Customer.get(entity)
      customer.partner = _partner.id
      await customer.save()
      res.json({alreadyAdded:false,message:"Parter added Successfully"})
   } catch (error) {
      return next(new APIError(error))
   }
}

exports.validatePartner = async (req, res, next) => {
   try {
      let { mobile }= req.body
      if(mobile && mobile.number && mobile.countryCode){
         return next()
      }else{
         return next(new APIError({message:"Please provide partner number"}))
      }
   } catch (error) {
      return next(new APIError(error))
   }
}

exports.removePartnerFromPartner = async (req, res, next) => {
   try {
      const { partner } = req.body
      const { entity } = req.session
      let _partner = await Customer.findOneAndUpdate({_id: partner,'partner.id':entity},{$set:{relationshipStatus:"INACTIVE",partner:false}},{
         new: true
       })
      console.log(_partner)
      return next()
   } catch (error) {
      return next(new APIError(error))
   }
}

exports.setSaved = async (req, res, next) => {
   try {
      let { to,from } = req.body
      if(to && from){
         to = await Customer.get(to)
         from = await Customer.get(from)
         if(to.saveChat && from.saveChat){
            req.body.saved = "BOTH"
            return next()
         }else if(to.saveChat){
            req.body.saved = "TO"
            return next()
         }else if(from.saveChat){
            req.body.saved = "FROM"
            return next()
         }else{
            return res.json({message:"NOT SAVED"})
         }
      }else{
         return next({message:'To or From not provided'})
      }
   } catch (error) {
      return next(new APIError(error))
   }
}

exports.setLoggedInUser = async (req, res, next) => {
   try {
      const { entity } = req.session
      const customer = await Customer.get(entity)
      req.locals = { customer }
      return next()
   } catch (error) {
      return next(new APIError(error))
   }
}


exports.findCustomerByMobile = async (req, res, next) => {
   try {
      const { mobile } = req.body
      if(mobile){
         const { number, countryCode } = mobile
         let customer
         customer = await Customer.findOne({ 'mobile.number': number, 'mobile.countryCode': countryCode })
         if (customer) {
            req.locals = { exist:true }
            return next()
         } else {
            req.locals = { exist:false }
            return next()
         }
      }else{
         return next(new APIError({message:"Please provide mobile information"}))
      }
   } catch (error) {
      return next(new APIError(error))
   }
}

exports.setCustomer = async (req,res,next) => {
   try {
      let { entity } = req.session
      let customer = await Customer.findById(entity)
      if (customer) {
         if(req.locals){
            req.locals.customer = customer.transform()
            return next()
         }else{
            req.locals= { customer: customer.transform()}
            return next()
         }
      }
      else{
         return next(new APIError({message:"Customer not found"}))
      }
   } catch (error) {
      return next(new APIError(error))
   }
}

exports.setGroupFromCustomer = async (req,res,next) => {
   try {
      let { customer } = req.locals
      if (customer.friendGroup) {
        req.locals.friendGroup = customer.friendGroup
        return next()
      }
      else{
         return next(new APIError({message:"Not a part of any group"}))
      }
   } catch (error) {
      return next(new APIError(error))
   }
}

exports.setGroupInCustomer = async (req,res,next) => {
   try {
      let { group } = req.locals
      let {entity} = req.session
      let customer = await Customer.findById(entity)
      customer.friendGroup = group.id
      customer.attempts = customer.attempts+1
      customer.lastGroupInsertionTime=new Date()
      customer = await customer.save()
      req.locals.customer = customer
      return next()
   } catch (error) {
      return next(new APIError(error))
   }
}


exports.exitFromGroup = async(req,res,next)=>{
   try{
      let {entity}= req.session
      let customer = await Customer.get(entity)
      if(customer.friendGroup){
         let friendGroup = customer.friendGroup
         customer = await Customer.findOneAndUpdate({_id:customer._id},{$unset:{friendGroup:1}, $addToSet: { pastFriendGroup: customer.friendGroup }},{new:true})
         req.locals = { customer,friendGroup }
         return next()
      }else{
         return next(new APIError({message:'Yor are not a part of any group'}))
      }
   }catch(error){
      return next(new APIError(error))
   }
}

exports.setGroupAndUser = async (req,res,next) => {
   try {
      let {entity} = req.session
      let customer = await Customer.findById(entity)
      if(customer.friendGroup){
         req.body.customer = entity
         req.body.group = customer.friendGroup
         return next()
      }else{
         return next(new APIError({message:'You are not a part of group'}))
      }
   } catch (error) {
      return next(new APIError(error))
   }
}

require("./encrypt.decrypt.service")