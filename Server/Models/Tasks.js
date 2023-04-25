const mongoose=require('mongoose')

const taskSchema=mongoose.Schema({
    task:{
        unique:true,
        type:String,
        required:true
    },
    completed:{
        required:true,
        type:Boolean,
        default:false
    }
})

module.exports=mongoose.model("Tasks",taskSchema)