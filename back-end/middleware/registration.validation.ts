import { Context , Next } from "koa"
import { creatingFailureBody } from '../utils/resBodies'
import User from '../database/models/user.model';


interface RequestBody {
    username: string;
    email: string;
    password: string;
}


export const  registrationValidation = async (ctx : Context, next : Next ) => {
    
    const user = ctx.request.body as RequestBody;

    // check data availability
    if (!user.email) { 
        ctx.response.status = 400;
        ctx.response.body = creatingFailureBody('email is required');
        return
    }

    // Check if a user with the same email already exists
    // const existingUser = await User.findOne({ email: user.email });
    // if (existingUser) {
    //     ctx.status = 400;
    //     ctx.body = creatingFailureBody('Email already in use');
    //     return;
    // }

    // check username availabilty
    if (!user.username) {
        ctx.response.status = 400;
        ctx.response.body = creatingFailureBody('username is required');
        return
    }

    
    if (!user.password) {
        ctx.response.status = 400;
        ctx.response.body = creatingFailureBody('password is required')
        return;
    }

    // data is validated
    await next();
}