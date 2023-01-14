
const express=require("express")
const {NoteModel}=require("../models/note.model")
const path=require("path")


const noteRouter=express.Router()

noteRouter.get("/",async (req,res)=>{
   try {
      let notes=await NoteModel.find()
      res.send(notes)
    
   } catch (error) {
      console.log(error);
   }
})




noteRouter.post("/create",async (req,res)=>{
    const payload=req.body
  try {
    const new_note=new NoteModel(payload)
    await new_note.save()
    res.send("Note Created")
    
  } catch (error) {
    console.log(error);
  }
})

noteRouter.patch("/update/:id",async(req,res)=>{
  const payload=req.body;
  const id=req.params.id;
  const note=await NoteModel.findOne({_id:id})
  console.log(note)
  const userID_in_note=note.userID;
  const userID_making_req=req.body.userID
  try{
      if( userID_making_req!==userID_in_note){
          res.send({"msg":"Not Authorise"})
      } else {
          await NoteModel.findByIdAndUpdate({_id:id},payload)
          res.send("Updated the note")
      }
  }catch(e){
      console.log(e)
      res.send({msg:"Error"})
  }
})

noteRouter.delete("/delete/:id",async(req,res)=>{
    const Id=req.params.id
    const note= await NoteModel.findOne({_id:Id})
    const userID_in_note=note.userID
    const userID_making_req=req.body.userID
    try {
      if(userID_making_req!=userID_in_note){
        res.send({"msg":"You are not authorised"})
      }else{
        let note=await NoteModel.findByIdAndDelete({_id:Id})
        res.send({"msg":`Deleted the note of id:${Id}`})
      } 
    } catch (error) {
        console.log(error);
    }
})


module.exports={
    noteRouter
}