// core module and types of koa 
import { Context } from 'koa'

import User from '../database/models/user.model';

// custom functionalities
import { generateToken } from '../utils/token.generator';
import { raiseSuccess } from '../utils/response.beautifier'



interface BaseBody {
    email: string;
}

interface RequestBody extends BaseBody {
    password: string;
}

interface ResponseBody extends BaseBody {
    token : string,
    role : string
}


export const login = async (ctx: Context) => {
   
    try{
        
        const user = ctx.request.body as RequestBody;

        console.log();
        
           
        // generate access token for user
        const token = generateToken( ctx.userData.id , ctx.userData.pwd , ctx.userData.role);
        
        // Send a success response
        const response : ResponseBody = {
            email: user.email,
            token : token,
            role : ctx.userData.role
        } 
   
        ctx.status = 200;
        ctx.body = raiseSuccess('User logined successfully' ,  { user : response } );
   
    }catch( error ){
        console.error(`ERROR : ${error}`);
    }

}