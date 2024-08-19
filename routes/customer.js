const express = require('express');
const { getNewCustomersOverTime, getCustomerDistribution } = require('../controllers/customersController');
const router = express.Router();

router.get('/new-customers-over-time', getNewCustomersOverTime);
router.get('/customer-distribution', getCustomerDistribution);

module.exports = router