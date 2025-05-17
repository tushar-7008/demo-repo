/*//creating a HTTP server
const express = require("express")
const app = express();
console.log(`SERVER STARTED`)

function sum(n)
{   
    console.log("value of n in function" + n);
    if (n < 1) return 0; // Edge case: If n is less than 1, the sum is 0.
    return (n * (n + 1)) / 2;
}
app.get("/", (req,res)=>{
    let inputVal = parseInt(req.query.n);
    let ans = sum(inputVal);
    res.send(`ans = ${ans}`.toString());
})
app.listen(3000);
*/
const express = require("express");
const app = express();
app.use(express.json());
var user = [{
    name : "John",
    kidneys: [{
        health:false
    }]
}]
//get is fetching us the health data of user kidneys
app.get("/",(req,res)=>{
    const userkidneys = user[0].kidneys
    const patientName = user[0].name;
    const totalNumberOfKidneys = userkidneys.length;
    let numberOfHealthyKidneys = 0;
    for (let i = 0; i < userkidneys.length; i++) {
        if(userkidneys[i].health)
        {
            numberOfHealthyKidneys++;
        }
    }
    const numberOfUnhealthyKidneys = totalNumberOfKidneys - numberOfHealthyKidneys;
    res.json({
        patientName,
        totalNumberOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnhealthyKidneys
    })
})

// for get request we use query parameters
// for post request we use body

//post letting us add a new healthy kidney
app.post("/", (req,res)=>{
    const isHealthy = req.body.isHealthy;
    user[0].kidneys.push({
        health:isHealthy
    })
    res.json(
        {
            msg:"Done!"
        }
    )
})

// update the unhealty kidney too a healthy one
app.put("/",(req,res)=>{
    for (let i = 0; i < user[0].kidneys.length; i++) {
        user[0].kidneys[i].health = true;
    }
    res.json(
        {
            msg : "all unhealthy kidneys are healthy now"
        }
    )
})

app.delete("/",(req,res)=>{
    const newKidney = [];
    for (let i = 0; i < user[0].kidneys.length; i++) {
        if(user[0].kidneys[i].health)
        {
            newKidney.push({
                health:true
            })
        }
    }
    user[0].kidneys = newKidney; 
    res.json({
        msg:"unhealthy kindey removed"
    })

})
app.listen(3000);
