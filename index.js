const express = require("express");
const app = express();
const mongoose =  require("mongoose");
const bodyparser = require("body-parser");
const post = require("./models/post");
const register = require("./models/user");
const url = "mongodb://localhost:27017/assignment";
const jwt = require('jsonwebtoken');
const secret = "RESTAPIAUTH";
const port = 3000;

mongoose.connect(url);
const db = mongoose.connection

db.on("error", (err)=>{
    console.log(err);
})
db.once("open", ()=>{
    console.log("Database Connected!");
})
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json());

let data = [];
app.post("/register", async(req,res)=>{
        try{
            let details =  data.push(register.insertMany({
                name:req.body.name,
                email:req.body.email,
                password: req.body.password
            }));
            res.json({
                status:"sucess",
                details
            })
        }
        catch(e){
            console.log(e.message);
            res.json({
                message:e.message,
                status:"Failure"
            })
        }
})

app.post("/login", async(req,res)=>{
    try{
        const{email, password} = req.body;
        let login = await register.find({email,password});
        if(!login){
         return res.status(409).json({
             status:"Failure",
             message:"There is no account with this email"
         })
        }
        //if user already there compare the password
        if(login){
            // Create a token after login 
            const token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data: login._id
              }, secret);


            return res.json({
                status: "Success",
                message: "Login Succesful",
                token
            })
        }else {
            return res.status(401).json({
                status: "Failed",
                message: "Invalid credentials"
            })
        }

    }

      catch (e) {
    res.json({
        status: "Failed",
        message: e.message
    })
}
})

let detail = []
app.post("/Posts", async(req,res)=>{
    try{
        let posts =  detail.push(post.insertMany({
            title:req.body.title,
            body:req.body.body,
            image: req.body.image
        }));
        res.json({
            status:"sucess",
            posts
        })
    }
    catch(e){
        console.log(e.message);
        res.json({
            message:e.message,
            status:"Failure"
        })
    }
})

app.get("/posts", async(req,res)=>{
    try{
        const posts = await post.find();
        res.json({
            status:"sucess",
            posts
        })
    }
    catch(e){
        res.status(400).json({
            status:"Failure",
            message:e.message
        })
    }
})

app.put("/posts/:postId", async(req,res)=>{
    try{
        const posts = await post.updateOne({image:req.params.image}, req.body);
        res.json({
            status:"sucess",
            posts
        })
    }
    catch(e){
        res.status(404).json({
            status:"Could Not able to Update",
            message:e.message
        })
    }
})

app.delete("/posts/:postId", async(req,res)=>{
    try{
        const posts = await post.deleteOne({_id : req.params.id}, req.body);
        res.json({
            status:"sucess",
            posts
        })
    }
    catch(e){
        res.status(404).json({
            status:"Not Deleted",
            message:e.message
        })
    }
})

app.get("*", (req,res)=>{
    res.status(404).send("API NOT FOUND")
})

app.listen(port, ()=>{console.log(`serveris up on ${port}`)});