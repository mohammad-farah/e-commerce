// core module and types of koa 
import Router from 'koa-router';
import { Context } from 'koa'
// encryption and security module
import dotenv from 'dotenv';
import bcrypt from 'bcrypt'
// validation middleware
import { registrationValidation } from '../middleware/registration.validation';
// custom modules and functionality
import User from '../database/models/user.model';
import { generateToken } from '../utils/genToken';
import { creatingSuccessBody } from '../utils/resBodies'


const register: Router = new Router();


interface RequestBody {
    username: string;
    email: string;
    password: string;
}

interface ResponseBody {
    username: string;
    email: string;
    token : string
}



register.post('/', registrationValidation, async (ctx: Context) => {
    
    const user = ctx.request.body as RequestBody;
    
    // Hash the password with bcrypt 
    dotenv.config();   
    const salt : string = process.env.SALT_ROUNDS || "" ;
    const hashedPassword = await bcrypt.hash(user.password, salt );


    // Create a new user instance
    // const newUser = new User({
    //     username: user.username,
    //     email: user.email,
    //     password: hashedPassword,
    // });

    // await newUser.save();

    
     // generate access token for user
     const token = generateToken( user.email , hashedPassword , 'user') // must be from the database

    // Send a success response
    const response : ResponseBody = {
        username : user.username,
        email: user.email,
        token : token
    } 
    ctx.status = 201;
    ctx.body = creatingSuccessBody('User registered successfully' , response );

});

export default register;