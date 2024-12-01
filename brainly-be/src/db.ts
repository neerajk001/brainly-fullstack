import mongoose, { model, Schema } from 'mongoose';

const UserSchema = new Schema({
    username:{type:String , unique:true},
    password:{type:String }
})

 export const  UserModel = mongoose.model('user',UserSchema)