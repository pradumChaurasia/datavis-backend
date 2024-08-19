const shopifyCustomers = require('../models/shopifyCustomer.js');


// 1. New Customers Added Over Time
exports.getNewCustomersOverTime = async (req, res) => {
  try {
    const customers = await shopifyCustomers.aggregate([
        {
          $addFields: {
            created_at_date: {
              $dateFromString: {
                dateString: "$created_at",
                onError: null, 
                onNull: null 
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
            count: { $sum: 1 }
          }
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } }
      ]);
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. Geographical Distribution of Customers
exports.getCustomerDistribution = async (req, res) => {
  try {
    const distribution = await shopifyCustomers.aggregate([
      {
        $group: {
          _id: "$default_address.city",
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);
    res.json(distribution);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
