require('dotenv').config()
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_API,{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(() => {
    console.log("Mongodb Connection Successful");
}).catch((err) => {
    console.log(err);
})
