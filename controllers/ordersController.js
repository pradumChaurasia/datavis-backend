const shopifyOrders = require('../models/shopifyOrder.js');

// 1. Total Sales Over Time
exports.getTotalSalesOverTime = async (req, res) => {
    try {

        const sales = await shopifyOrders.aggregate([
            {
                $addFields: {
                    created_at_date: {
                        $dateFromString: {
                            dateString: "$created_at",
                            onError: null, // Handles conversion errors
                            onNull: null // Handles null values
                        }
                    },
                    total_price_number: {
                        $convert: {
                            input: "$total_price",
                            to: "double",
                            onError: 0, 
                            onNull: 0 
                        }
                    }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$created_at_date" },
                        month: { $month: "$created_at_date" }
                    },
                    total_sales: { $sum: "$total_price_number" }
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } }
        ]);
        res.json(sales);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
};

// 2. Sales Growth Rate Over Time
exports.getSalesGrowthRateOverTime = async (req, res) => {
    try {
        const sales = await shopifyOrders.aggregate([
            {
                $addFields: {
                    created_at_date: {
                        $dateFromString: {
                            dateString: "$created_at",
                            onError: null, 
                            onNull: null 
                        }
                    },
                    total_price_number: {
                        $convert: {
                            input: "$total_price",
                            to: "double",
                            onError: 0, 
                            onNull: 0
                        }
                    }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$created_at_date" },
                        month: { $month: "$created_at_date" }
                    },
                    total_sales: { $sum: "$total_price_number" }
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } }
        ]);

        let previousSales = 0;
        const growthRate = sales.map((sale) => {
            const growth = previousSales === 0 ? 0 : ((sale.total_sales - previousSales) / previousSales) * 100;
            previousSales = sale.total_sales;
            return { ...sale, growth_rate: growth };
        });

        res.json(growthRate);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// 3. Number of Repeat Customers
exports.getDailyRepeatCustomers = async (req, res) => {
    try {
        const dailyRepeatCustomers = await shopifyOrders.aggregate([
            {
                $addFields: {
                    created_at_date: {
                        $dateFromString: { dateString: "$created_at" }
                    }
                }
            },
            {
                $group: {
                    _id: {
                        day: { $dayOfMonth: "$created_at_date" },
                        month: { $month: "$created_at_date" },
                        year: { $year: "$created_at_date" },
                        customerId: "$customer.id"
                    },
                    order_count: { $sum: 1 }
                }
            },
            { $match: { order_count: { $gt: 1 } } },
            {
                $group: {
                    _id: {
                        day: "$_id.day",
                        month: "$_id.month",
                        year: "$_id.year"
                    },
                    repeat_customers_count: { $sum: 1 }
                }
            }
        ]);

        res.json(dailyRepeatCustomers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



exports.getMonthlyRepeatCustomers = async (req, res) => {
    try {
        const monthlyRepeatCustomers = await shopifyOrders.aggregate([
            {
                $addFields: {
                    created_at_date: {
                        $dateFromString: { dateString: "$created_at" }
                    }
                }
            },
            {
                $group: {
                    _id: {
                        month: { $month: "$created_at_date" },
                        year: { $year: "$created_at_date" },
                        customerId: "$customer.id"
                    },
                    order_count: { $sum: 1 }
                }
            },
            { $match: { order_count: { $gt: 1 } } },
            {
                $group: {
                    _id: {
                        month: "$_id.month",
                        year: "$_id.year"
                    },
                    repeat_customers_count: { $sum: 1 }
                }
            }
        ]);

        res.json(monthlyRepeatCustomers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getYearlyRepeatCustomers = async (req, res) => {
    try {
        const yearlyRepeatCustomers = await shopifyOrders.aggregate([
            {
                $addFields: {
                    created_at_date: {
                        $dateFromString: { dateString: "$created_at" }
                    }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$created_at_date" },
                        customerId: "$customer.id"
                    },
                    order_count: { $sum: 1 }
                }
            },
            { $match: { order_count: { $gt: 1 } } },
            {
                $group: {
                    _id: "$_id.year",
                    repeat_customers_count: { $sum: 1 }
                }
            }
        ]);

        res.json(yearlyRepeatCustomers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




// 4. Customer Lifetime Value by Cohorts
exports.getCLTVByCohorts = async (req, res) => {
    try {
        // Aggregate customer lifetime value by cohorts based on the month of the first purchase
        const cohorts = await shopifyOrders.aggregate([
            // Convert `created_at` to Date if it's stored as a string
            {
                $addFields: {
                    created_at_date: {
                        $dateFromString: { dateString: "$created_at" }
                    }
                }
            },
            // Group by customer and find the first purchase and total spent
            {
                $group: {
                    _id: {
                        year: { $year: "$created_at_date" },
                        month: { $month: "$created_at_date" },
                        customer_id: "$customer.id"
                    },
                    first_purchase: { $min: "$created_at_date" },
                    total_spent: { $sum: { $toDouble: "$total_price" } }
                }
            },
            // Group by the month of the first purchase and calculate the cohort lifetime value
            {
                $group: {
                    _id: {
                        year: { $year: "$first_purchase" },
                        month: { $month: "$first_purchase" }
                    },
                    customers: {
                        $push: {
                            customer_id: "$_id.customer_id",
                            total_spent: "$total_spent"
                        }
                    },
                    cohort_lifetime_value: { $sum: "$total_spent" }
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } }
        ]);

        res.json(cohorts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
