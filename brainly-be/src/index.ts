import  Express  from "express";
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import { UserModel } from "./db";
const jwt_password ="bhbhdb3456"
const app = Express();
app.use(Express.json());


app.post('/api/v1/signup' ,async  (req ,res)  =>{
    const username =req.body.username;
    const password =req.body.password;

    await  UserModel.create({
        username:username,
        password:password,
    })

    res.json({
        message:'you  signed up'
    })
})

app.post('/api/v1/signin',async(req ,res)=>{
    const username =req.body.username;
    const password =req.body.password;

    const existingUser =await UserModel.findOne({
        username,
        password

    })

    if(existingUser){
        const token = jwt.sign({
            id: existingUser._id
        }, jwt_password)

        res.json({
            token:token,
        })

    }else{
        res.status(403).json({
            message:"incorrect credential"
        })
    }

    
})



async function main(){
    await mongoose.connect("mongodb+srv://neeraj001:heyramheyram001@cluster0.rlawr.mongodb.net/third-brain")
    console.log("the database has connected")
    app.listen(3000 ,()=>{
        console.log("listening at port 3000")
       })
}
main()

