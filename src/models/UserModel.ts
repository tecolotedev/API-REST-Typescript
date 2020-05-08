import {Schema,model,Document} from 'mongoose';
import bcryp from 'bcrypt';

export interface IUser extends Document{
    name:string;
    email:string;
    password:string;
    encryptPassword(password:string):Promise<string>;
    comparePassword(password:string):boolean;
}

const userSchema = new Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true
    },
    password:{
        type:String
    }
});


userSchema.methods.encryptPassword = async (password:string):Promise<string> =>{
    let hash = await bcryp.genSalt();
    let passEncrypt =  await bcryp.hash(password,hash);
    return passEncrypt;
}

userSchema.methods.comparePassword = function(password:string):boolean{
    return bcryp.compareSync(password,this.password);
}

export default model<IUser>('UserModel',userSchema);