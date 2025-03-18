import  Express  from "express";
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import { UserModel, contentModel, linkModel } from './db';
import { jwt_password } from "./config";
import { userMiddleware } from "./middleWare";
import  { random } from './utils'
import cors from 'cors';


const app = Express();
app.use(Express.json());
app.use(cors())



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

app.delete("/api/v1/content/:id",userMiddleware,async(req ,res) =>{
    const contentId =req.params.id;
    //@ts-ignore
    const userId =req.userId;
    await contentModel.findOneAndDelete({
       _id: contentId,
        userId
    })
    res.json({
        message:"deleted"
    })
})

app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
    const share = req.body.share;
    if (share) {
            const existingLink = await linkModel.findOne({
                //@ts-ignore
                userId: req.userId
            });

            if (existingLink) {
                res.json({
                    hash: existingLink.hash
                })
                return;
            }
            const hash = random(10);
            await linkModel.create({
                //@ts-ignore
                userId: req.userId,
                hash: hash
            })

            res.json({
                hash
            })
    } else {
        await linkModel.deleteOne({
            //@ts-ignore
            userId: req.userId
        });

        res.json({
            message: "Removed link"
        })
    }
})

app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;

    const link = await linkModel.findOne({
        hash
    });

    if (!link) {
        res.status(411).json({
            message: "Sorry incorrect input"
        })
        return;
    }
    // userId
    const content = await contentModel.find({
        userId: link.userId
    })

    
    const user = await UserModel.findOne({
        _id: link.userId
    })

    if (!user) {
        res.status(411).json({
            message: "user not found, error should ideally not happen"
        })
        return;
    }

    res.json({
        username: user.username,
        content: content
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

