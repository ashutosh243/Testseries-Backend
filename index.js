const express= require('express');
const app=express();
const bcrypt=require('bcrypt');
const jwt =require('jsonwebtoken');
const cors=require('cors');
const dotenv=require('dotenv');
dotenv.config();
const cookieParser=require('cookie-parser');
const {sql,connectToDB}=require('./Database/db');
const port=process.env.PORT||8000;
const userRoutes=require('./routes/user.routes');

connectToDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


// app.get('/',(req,res)=>{return res.json({msg:"working"})});
app.use('/api/v1/user',userRoutes);




app.listen(port,()=>{
    console.log(`server is listening on port ${port}`);
});

