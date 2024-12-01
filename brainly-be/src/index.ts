import  Express  from "express";
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import { UserModel } from "./db";

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

async function main(){
    await mongoose.connect("mongodb+srv://neeraj001:heyramheyram001@cluster0.rlawr.mongodb.net/third-brain")
    console.log("the database has connected")
    app.listen(3000 ,()=>{
        console.log("listening at port 3000")
       })
}
main()

