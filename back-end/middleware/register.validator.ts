import { Context , Next } from "koa"
import { raiseWarning } from '../utils/resBodies'
import User from '../database/models/user.model';


interface RequestBody {
    username: string;
    email: string;
    password: string;
}


export const  registrationValidator = async (ctx : Context, next : Next ) => {
    
    const user = ctx.request.body as RequestBody;

    // check data availability
    if (!user.email) { 
        ctx.response.status = 400;
        ctx.response.body = raiseWarning('email is required');
        return
    }

    // Check if a user with the same email already exists
    // const existingUser = await User.findOne({ email: user.email });
    // if (existingUser) {
    //     ctx.status = 400;
    //     ctx.body = raiseWarning('Email already in use');
    //     return;
    // }

    // check username availabilty
    if (!user.username) {
        ctx.response.status = 400;
        ctx.response.body = raiseWarning('username is required');
        return
    }

    
    if (!user.password) {
        ctx.response.status = 400;
        ctx.response.body = raiseWarning('password is required')
        return;
    }

    // data is validated
    await next();
}