import  { model, Schema } from 'mongoose';
import mongoose from 'mongoose';

const UserSchema = new Schema({
    username:{type:String , unique:true},
    password:{type:String }
})

 export const  UserModel = model('user',UserSchema)

 const ContentSchema = new Schema({
    title:{type:String},
    link:String,
    type:String,
    tags:[{type:mongoose.Types.ObjectId ,ref:'Tag' }],
    userId: {type: mongoose.Types.ObjectId, ref: 'user', required: true },

 })

 const LinkSchema = new Schema({
    hash:String,
    userId: {type: mongoose.Types.ObjectId, ref: 'user', required: true , unique:true}

 })

export const linkModel =model("Links" ,LinkSchema)
export const contentModel =model('content' ,ContentSchema)
 
