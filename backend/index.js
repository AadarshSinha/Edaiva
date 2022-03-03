const express = require('express')
const mysql =require('mysql')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const app = express()
app.use(express.json())
app.use(cors())

const db=mysql.createConnection({
  host:'localhost',
  user: 'root',
  password:'aadarsh0',
  database:'Edaiva',
})

app.get("/",(req,res)=>{
    res.send("Hello User")
 });

 app.post("/add",(req,res)=>{

    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const phone = req.body.phone
    const password = req.body.password
    const email = req.body.email
    const address = req.body.address
    db.query(
      "INSERT INTO records (firstname , lastname , password , phone , email , address) VALUES (?,?,?,?,?,?)",
      [firstname , lastname , password , phone , email , address],
      (err,result)=>{
          if(err)  console.log(err)
          else
          {
            console.log(result)
            res.send("added successfully")
          }
      } 
    );
 });

 app.post('/login', (req, res) => {
    console.log("request recieved")
    const email=req.body.loginemail
    const password=req.body.loginpassword
    console.log(email+" "+password)
    db.query(
        "SELECT * FROM Edaiva.records WHERE email=? && password=?",
        [email,password],
        (err,result)=>{
            if(err)  
            {
                console.log(err)
                res.json({auth:false})
            }
            else
            {
                if(result.length===0) 
                {
                    console.log(result)
                    res.json({auth:false})
                }
                else
                {
                    const id=result[0].id
                    const token=jwt.sign({id},"jwtCode",{
                        expiresIn:300,
                     })
                    console.log("Logged in")
                    console.log("Token = "+token)
                    res.json({auth:true,token:token})
                }
            }
        }
    )
});
    
const verify = (req,res,next) => {
    console.log("token = = " +req.body.token)
     const token=req.header["token"]
     if(!token){
       console.log("no token")
       res.send("No token")
     }
     else{
       jwt.verify(token,"jwtCode",(err,res)=>{
         if(err)
           res.send("Invalid token")
         else {
           console.log("Auth Successfull")
           next();
         }
       })
     }
}

 app.get('/get', (req, res) => {
    console.log("token = = =" +req.body.token)
    
    // db.query(
    //     "SELECT * FROM Edaiva.records WHERE email=? && password=?",
    //     [email,password],
    //     (err,result)=>{
            
    //     } 
    //   );

})

app.listen(2000, () => { 
  console.log("Server started")
  db.connect((err)=>{
    if(err)
    console.log("ERROR",err)
    else
    console.log('MySql server connected ...')
  })
})