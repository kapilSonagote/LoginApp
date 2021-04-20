const express = require('express');
const controller = require('@controllers/customer.controller');
const { authorize } = require('@middlewares/auth');

const router = express.Router();

router.route("/login")
   .post(controller.loginCustomer)

module.exports = router;
