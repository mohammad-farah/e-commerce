// core module and types of koa 
import Router from 'koa-router';
import { Context } from 'koa'
// encryption and security module
import dotenv from 'dotenv';
// validation middleware
import { loginValidation } from '../middleware/login.validation';
// custom modules and functionality
import User from '../database/models/user.model';
import { generateToken } from '../utils/genToken';
import { creatingSuccessBody } from '../utils/resBodies'



const login: Router = new Router();


interface RequestBody {
    email: string;
    password: string;
}

interface ResponseBody {
    email: string;
    token : string
}



login.post('/', loginValidation, async (ctx: Context) => {
    
    const user = ctx.request.body as RequestBody;
    
    // generate access token for user
    const token = generateToken( user.email , user.password , 'user') // must be from the database

    // Send a success response
    const response : ResponseBody = {
        email: user.email,
        token : token
    } 
    ctx.status = 201;
    ctx.body = creatingSuccessBody('User logined successfully' , response );

});

export default login;