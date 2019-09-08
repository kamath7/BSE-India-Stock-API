const request = require("request-promise");
const cheerio = require('cheerio');

const getMeMyPrice = (stockName)=>{
    return new Promise(function(resolve,reject){
        request(`https://money.rediff.com/companies/${stockName}`,function(error,response,html){
            const $ = cheerio.load(html);
    
            let stock = {
                stockName: stockName,
                stockPrice: $('#ltpid').text(),
                yearlyHighLow: $('#FiftyTwoHighlow').text()
               };
               if(error){
                   reject("Incorrect stock");
               }else{
                   resolve(stock);
               }
        })

    });

};
module.exports = {
    getMeMyPrice
};



        //    let stockName = userInput;
        //    let stockPrice = $('#ltpid').text();
        //    let yearlyHighLow = $('#FiftyTwoHighlow').text();
        //    console.log(stockPrice);
          
        //    console.log(stockObject);