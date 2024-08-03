// core module and types of koa 
import { Context } from 'koa'

import User from '../database/models/user.model';

// custom functionalites
import { generateToken } from '../utils/genToken';
import { hashPassword } from '../utils/genHash';
import { raiseWarning, raiseSuccess } from '../utils/resBodies'

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
        // const newUser = new User({
        //     username: user.username,
        //     email: user.email,
        //     password: hashedPassword,
        // });

        // await newUser.save();


        // generate access token for user
        const token = generateToken(user.email, hashedPassword, 'user') // must be from the database

        // Send a success response
        const response: ResponseBody = {
            username: user.username,
            email: user.email,
            token: token
        }

        ctx.status = 201;
        ctx.body = raiseSuccess('User registered successfully', response);

    } catch (error) {

        ctx.status = 400;
        ctx.body = raiseWarning('Internatl Error');

    }


}