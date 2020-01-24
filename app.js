const {getMeMyPrice,getMeMarketPrices} = require('./src/stockprices.js');

const express = require('express');
const app = express();
const port = process.env.PORT||3000;

// app.get("/",(req,res)=>{
//     res.status(200).send("Enter a Stock name");
// });
app.get("/prices",(req,res)=>{
    getMeMarketPrices().then((price)=>{
        res.status(200).send({
            BSERate: price.bsePrice,
            NSERate: price.nsePrice
        });
    });
});
app.get("/:stock",(req,res)=>{
    let stock = req.params.stock;
    if(!stock){
        res.status(400).send({
            error: "Enter a value in the format /stockName"
        });
    }
    else{
        getMeMyPrice(stock).then((result)=>{
            if(result.stockPrice === ""){
                res.status(400).send({
                    error: "Enter valid input"
                });
                return; 
            }else{ 
                res.status(200).send({
                stockName: result.stockName,
                stockPrice: result.stockPrice,
                yearlyHighLow: result.yearlyHighLow,
                previousClose:result.prevClose,
                dayHigh: result.dayHigh,
                dayLow: result.dayLow,
                NSEPrice: result.NSE_Price
            });
        }
           
        }).catch((error)=>{
            res.status(400).send({
                error: "Enter valid input"
            });
        });
    }

});

app.listen(port,()=>{
    console.log("Listening on port",port);
});

// let {stockName, stockPrice, yearlyHighLow} = getStockPrice("Infosys");
// console.log(stockName,stockPrice,yearlyHighLow);

