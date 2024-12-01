import mongoose, { model, Schema } from 'mongoose';

const UserSchema = new Schema({
    username:{type:String , unique:true},
    password:{type:String }
})

 export const  UserModel = model('user',UserSchema)

 const ContentSchema = new Schema({
    title:{type:String},
    link:String,
    tags:[{type:mongoose.Types.ObjectId ,ref:'Tag' }],
    type:String

 })

 