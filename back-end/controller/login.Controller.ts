// core module and types of koa 
import { Context } from 'koa'

import User from '../database/models/user.model';

// custom functionalities
import { generateToken } from '../utils/genToken';
import { hashPassword } from './../utils/genHash';
import { raiseWarning, raiseSuccess } from '../utils/resBodies'



interface BaseBody {
    email: string;
}

interface RequestBody extends BaseBody {
    password: string;
}

interface ResponseBody extends BaseBody {
    token : string
}


export const loginController = async (ctx: Context) => {
   
    try{
        
        const user = ctx.request.body as RequestBody;

        // Hash the password with bcrypt 
        const hashedPassword = await hashPassword(user.password);
        
        // generate access token for user
        const token = generateToken( user.email , hashedPassword , 'user') // must be from the database
        
        // Send a success response
        const response : ResponseBody = {
            email: user.email,
            token : token
        } 
   
        ctx.status = 201;
        ctx.body = raiseSuccess('User logined successfully' , response );
   
    }catch( error ){

        ctx.status = 400;
        ctx.body = raiseWarning('Internal Error');
    
    }

}