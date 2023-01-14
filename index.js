
const express=require("express")
const {connection}=require("./config/db")
const {userRouter}=require("./routes/user.route")
const {noteRouter}=require("./routes/note.route")
const {authenticate}=require("./middlewares/authenticate.middleware")
const cors=require("cors")

// const {UserModel}=require("./models/user.models")
// const jwt=require("jsonwebtoken")
// const bcrypt=require("bcrypt")

const app=express()
app.use(cors())
app.use(express.json())
app.use("/user",userRouter)

app.get("/",(req,res)=>{
    res.send("All good")
})

app.use(authenticate)
app.use("/notes",noteRouter)



app.get("/about",(req,res)=>{
    res.send("About Api")
})



// app.get("/contact",(req,res)=>{
//     res.send("Contact Page")
// })

// app.get("/data",(req,res)=>{
//     const token=req.headers.authorization
//     jwt.verify(token, 'masai',(err,decode)=>{
//         if(err){
//             res.send("Invalid Token")
//             console.log(err);
//         }else{
//             res.send("Data..")
//         }

//     });
    
// })
// app.get("/cart",(req,res)=>{
//     const token=req.headers.authorization
//     jwt.verify(token, 'masai',(err,decode)=>{
//         if(err){
//             res.send("Invalid Token")
//             console.log(err);
//         }else{
//             res.send("cart Page..")
//         }

//     });
    
// })

app.listen(4500,async ()=>{
    try {
        await connection
        console.log("Connected to DB");
    } catch (error) {
        console.log(error)
    }
    console.log("Server is running at 4500")
})