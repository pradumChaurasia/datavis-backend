const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config()

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log("Connected")

    }
    catch(error){
        console.error("Error in coonnecting to Database: " + error.message);
    }
}

module.exports = connectDB;