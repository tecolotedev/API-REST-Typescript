import {Request,Response} from 'express';


const signup = (req:Request,res:Response):void =>{
    const {username,email,password} = req.body;
    if(req.getConnection){
        req.getConnection((err,connection)=>{

        });
    }
    res.send('sigup');
}
const signin = (req:Request,res:Response):void  =>{
    console.log(req.body);
    res.send('sigin');
}

const profiles = (req:Request,res:Response):void =>{
    res.send('profiles');
}

export {signin,signup,profiles};

