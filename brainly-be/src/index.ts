import  Express  from "express";
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import { UserModel, contentModel } from './db';
import { jwt_password } from "./config";
const app = Express();
app.use(Express.json());
import { userMiddleware } from "./middleWare";


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

app.post("/api/v1/content", userMiddleware, async (req, res) => {
    const link = req.body.link;
    const type = req.body.type;
    await contentModel.create({
        link,
        type,
        title: req.body.title,
        //@ts-ignore
        userId: req.userId,
        tags: []
    })

    res.json({
        message: "Content added"
    })
    
})

app.get("/api/v1/content", userMiddleware, async (req, res) => {
    //@ts-ignore
    const userId =req.userId;
    const content = await contentModel.find({
        userId:userId 
    }).populate("userId" ,"username")
    res.json({
        content
    })
}

)

app.delete("/api/v1/content",userMiddleware,async(req ,res) =>{
    const contentId =req.body.contentId;
    //@ts-ignore
    const userId =req.userId;
    await contentModel.deleteMany({
        contentId,
        userId
    })
    res.json({
        message:"deleted"
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

