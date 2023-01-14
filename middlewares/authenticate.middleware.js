
const jwt =require("jsonwebtoken")

const authenticate=(req,res,next)=>{
    const token=req.headers.authorization
    if(token){
        const decoded=jwt.verify(token,"masai")
        if(decoded){
            const userID=decoded.userID
            req.body.userID=userID
            // console.log(userID);
            next()
        }else{
            res.send("Please login First")
        }
    }else{
        res.send("Please login First")
    }
}

module.exports={
    authenticate
}