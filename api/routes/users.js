
var express = require('express');

var dbfunctions = require('../database/dbfunctions')
var router = express.Router();

let allUsers = {}

//Get a user data
router.get('/',async(req,res) => {
   
   const {user} = req.query
   
   var data = await dbfunctions.getData(user)
   

   res.send(data)
})


/* GET users listing. */
router.get('/all',async function(req, res, next) {
   
      allUsers = await dbfunctions.All_users()
     res.send(allUsers)

      
});

// Add a user
router.post('/add',async (req,res,next) => {


     if(await dbfunctions.add(JSON.parse(JSON.stringify(req.body)))){
       res.status(200).send("succsess")
     }
     else {
        res.status(404).send("username taken")
     }
})



//login 
router.post('/find',async(req,res) => {
   console.log(req.body)
   if(await dbfunctions.find(req.body)){
      console.log("found")
      res.status(200).send("success")
   }
   else{
      console.log("user not  found")
      res.status(404).send("not found")
   }
})

//delete database entries
router.get('/del',(req,res) => {
   dbfunctions.del()
   res.send("200")
})

//add data 
router.post('/data/add',async(req,res) => {
  
   var flag = await dbfunctions.addData(req.body)
   if(flag){
      res.status(200).send("success")
   }
   else{
      res.status(404).send("Error occured")
   }
})

//delete data
router.post('/data/del',async(req,res) => {
   const {id} = req.body
   console.log(id);

   if(await dbfunctions.delData(id)){
      res.status(200).send("success")
   }
   else{
      res.status(400).send("failure")
   }
   
})

//update data
router.post('/data/update',async(req,res) => {
   console.log("updating...");
   
   if(await dbfunctions.updateData(req.body)){
      res.status(200).send("success")
   }
   else{
      res.status(400).send("failed")
   }
})

module.exports = router;
