
const mongoose=require("mongoose")

const connection=mongoose.connect("mongodb+srv://ajitkhatua:ajitkhatua@cluster0.rbiqj.mongodb.net/nxmmasai?retryWrites=true&w=majority")

module.exports={
    connection
}