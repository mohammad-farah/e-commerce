// core module and types of koa 
import { Context } from 'koa'

import User from '../database/models/user.model';

// custom functionalites
import { generateToken } from '../utils/genToken';
import { hashPassword } from '../utils/genHash';
import { raiseSuccess } from '../utils/resBodies'

interface BaseBody {
    username: string;
    email: string;
}

interface RequestBody extends BaseBody {
    password: string;
}

interface ResponseBody extends BaseBody {
    token: string
}


export const  registrationController = async (ctx: Context) => {

    try {

        const user = ctx.request.body as RequestBody;

        // hash password
        const hashedPassword: string = await hashPassword(user.password);


        // Create a new user instance
        const newUser = await new User({
            username: user.username,
            email: user.email,
            password: hashedPassword,
        }).save();

        
        // generate access token for user
        const token = generateToken( newUser.id , newUser.password , newUser.role ) // must be from the database

        // Send a success response
        const response: ResponseBody = {
            username: user.username,
            email: user.email,
            token: token
        }

        ctx.status = 200;
        ctx.body = raiseSuccess('User registered successfully', response);
        

    }catch( error ){
        console.error(`ERROR : ${error}`);
    }


}