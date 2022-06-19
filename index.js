require('dotenv').config()
const express = require('express')
const Razorpay = require("razorpay");
const path = require("path");

const app = express();


app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/index.html"));
})

app.post('/orders', async (req, res) => {
    try {
        const amount = req.body.amount
        const receipt_id = Date.now();
        var instance = new Razorpay({
            key_id: process.env.KEY_ID,
            key_secret: process.env.KEY_SECRET,
        });
    
        const order = await instance.orders.create({
            amount: amount * 100,
            currency: "INR",
            receipt: `receipt#${receipt_id}`
        });
        const result = {
          success: true,
          amount: amount,
          receipt_id: receipt_id,
          order: order,
        };
        console.log("result: ",result)
        res.status(200).send(result);
    }
    catch (error) {
        console.log("Error: ",error)
    }
})

app.listen('4000', () => {
    console.log('App listening @ 4000...')
})