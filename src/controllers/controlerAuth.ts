import {Request,Response} from 'express';
import UserModel,{IUser} from '../models/UserModel';
import jwt from 'jsonwebtoken';

const signup = async (req:Request,res:Response)=>{
    const {name,email,password} = req.body;
    const user:IUser = new UserModel({name,email,password});
    user.password = await user.encryptPassword(user.password);
    user.save((err,userSaved:IUser)=>{

        if(err)return res.status(400).json({ok:false,message:'email is already in database'}); //if user could'nt be saved
        const {_id} = userSaved;
        const token:string = jwt.sign({_id},process.env.KEY_TOKEN || 'secret_key',{expiresIn:60*60}); //expires in one hour
        res.json({ok:true,token});  //standard response
    });
}
const signin = (req:Request,res:Response)  =>{
    const {email,password} = req.body;
    UserModel.findOne({email},(err,userDB)=>{
        if(err)return res.status(400).json({ok:false,err}); 

        if(!userDB) return res.json({ok:false,message:'wrong data'});// wrong email
        
        if(!userDB.comparePassword(password)) return res.json({ok:false,message:'wrong data'}); // wrong password

        const {_id} = userDB;
        const token:string = jwt.sign({_id},process.env.KEY_TOKEN || 'secret_key',{expiresIn:60*60}); //expires in one hour
        res.json({ok:true,token});  //standard response
    });
}

const profiles = (req:Request,res:Response) =>{
    
    res.send('profiles');
}

export {signin,signup,profiles};

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWI0ZDQwYjBiOGU2NDIxNjA1NDJjN2IiLCJpYXQiOjE1ODg5MDkwNjcsImV4cCI6MTU4ODkxMjY2N30.lXOXfgQwD-wi8CekksWC_LchxjPvYAA9ZXLMkuskckM