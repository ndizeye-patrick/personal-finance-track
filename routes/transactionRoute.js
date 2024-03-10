const express = require('express')
const router = express.Router()
const Transaction = require('../models/Transaction')
const validator = require('validator');
const moment = require('moment')

router.post('/add-transaction', async (req,res) => {
    try {
        const newTransaction = new Transaction(req.body);
        // newTransaction.userid = JSON.parse(localStorage.getItem('income-expense-manager-user')).data._id;
        await newTransaction.save();
        res.send("Transaction Added Successfully");
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post('/edit-transaction', async (req,res) => {
    try {
        const editTransaction = await Transaction.findOneAndUpdate({_id : req.body.transactionId}, req.body.payload);
        // newTransaction.userid = JSON.parse(localStorage.getItem('income-expense-manager-user')).data._id;
        res.send("Transaction Updated Successfully");
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

router.post('/delete-transaction', async (req,res) => {
    try {
        const editTransaction = await Transaction.findOneAndDelete({_id : req.body.transactionId});
        // newTransaction.userid = JSON.parse(localStorage.getItem('income-expense-manager-user')).data._id;
        res.send("Transaction Deleted Successfully");
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

router.post('/get-all-transactions', async (req,res) => {
    try {
        // const user = JSON.parse(localStorage.getItem('income-expense-manager-user'));
        // const allTranscationOfAUser = await User.find({userid: user.data._id});
        const {frequency, selectedRange,type} = req.body;

        const allTranscationOfAUser = await Transaction.find({
            ...(frequency !== "custom" ?           
                    {
                    date: {$gt: moment().subtract(req.body.frequency, 'd').toDate(),}
                    }
                    :
                    {   
                    date:{  $gte: selectedRange[0],
                            $lte: selectedRange[1], }
                    }
                ),
            userid: req.body.userid,
            ...(type !== 'all' && {type})
        }).sort({"date": -1});
        if(allTranscationOfAUser)
            res.send(allTranscationOfAUser);
        else
            res.status(500).json(error);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router