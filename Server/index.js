const express=require('express')
const app=express()
const todoRouter=require('./Routers/todoRouter')
const dbConnect=require('./dbConnect')
const cors=require('cors')
app.use(express.json())

app.use(cors({
    credentials:true,
    origin:'http://localhost:3000'
}))
app.get('/',(req,res)=>{
    res.send('Working perfect!')
})

app.use('/todo',todoRouter)





const port=4000
dbConnect()
app.listen(port,()=>{
    console.log(`Listening at ${port}`);
})