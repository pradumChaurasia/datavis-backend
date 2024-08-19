const express = require('express');
const dotenv = require('dotenv');
const customerRoutes = require('./routes/customer.js')
const orderRoutes = require('./routes/order.js')
const connectDB = require('./config/db.js');
const cors = require('cors')
const app = express();
dotenv.config();


connectDB();
// app.use(cors())
app.use(cors({
    origin: '*', 
    credentials: true
}));
app.use(express.json());


const PORT = process.env.PORT || 3000;



app.get('/', (req, res) => {
  res.send("Hello app")
})

app.use('/api/customer', customerRoutes);
app.use('/api/order', orderRoutes);




app.listen(PORT, () => {
  console.log(`Server is live on http://localhost:${PORT}`);
});