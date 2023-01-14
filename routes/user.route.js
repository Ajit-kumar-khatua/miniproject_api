const express=require("express")
const {UserModel}=require("../models/user.models")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const path=require("path")

const userRouter=express.Router()

userRouter.get("/signup",(req,res)=>{
    res.sendFile(path.join(__dirname,"../../Frontend/signup.html"))
})

userRouter.post("/register",async (req,res)=>{
    const {email,pass,name,age}=req.body
    try {
        bcrypt.hash(pass,5,async (err,secure_password)=>{
            if(err){
                console.log(err);
            }else{
                const user=new UserModel({email,pass:secure_password,name,age})
                await user.save()
                res.send({"msg":"Registered"})
            }
        })
       
    } catch (error) {
        res.send("Error While Registering")
        console.log(error)
    }
    
})

userRouter.get("/login",(req,res)=>{
    res.sendFile(path.join(__dirname,"../../Frontend/login.html"))
})

userRouter.post("/login",async (req,res)=>{
    const {email,pass}=req.body
    
    try {
        const user=await UserModel.find({email:email})
        const hash_pass=user[0].pass
        if(user.length>0){
            bcrypt.compare(pass,hash_pass, (err, result)=> {
                if(result){
                    var token = jwt.sign({userID:user[0]._id} , 'masai');
                    res.send({"msg":"login Sucessful","token":token})
                }else{
                    res.send("Wrong Credentials")
                }
            });
            
        }else{
            res.send("Wrong credentials")
        }      
    } catch (error) {
        console.log(error)
    }
})

module.exports={
    userRouter
}