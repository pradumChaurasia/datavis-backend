const express = require('express');
const { getSalesGrowthRateOverTime, getTotalSalesOverTime, getCLTVByCohorts, getDailyRepeatCustomers, getYearlyRepeatCustomers, getMonthlyRepeatCustomers } = require('../controllers/ordersController');
const router = express.Router();

router.get('/total-sales-over-time', getTotalSalesOverTime);
router.get('/sales-growth-rate-over-time',getSalesGrowthRateOverTime);
router.get('/getDailyRepeatCustomers', getDailyRepeatCustomers)
router.get('/getMonthlyRepeatCustomers', getMonthlyRepeatCustomers)
router.get('/getYearlyRepeatCustomers', getYearlyRepeatCustomers)
router.get('/cltv-by-cohorts', getCLTVByCohorts);

module.exports = router;