const express = require("express")
const app = express()
app.use(express.json())
const path = require("path");
const dbConnect = require("./dbConnect")
const userRoute = require('./routes/userRoute')
const transactionRoute = require('./routes/transactionRoute')

app.use('/api/users', userRoute);
app.use('/api/transactions/',transactionRoute);

const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, './client/build')))
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname, './client/build/index.htmlcd'))

})

if ( process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"));
    const path = require("path");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

app.get('/', (req,res) => res.send('hello world'));
app.listen(port, () => console.log(`App listening at port ${port}`));



