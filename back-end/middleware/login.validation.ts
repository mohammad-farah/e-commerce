// core module and types of koa 
import { Context , Next } from 'koa'
// encryption and security module
import dotenv from 'dotenv';
import bcrypt from 'bcrypt'
// custom modules and functionality
import User from '../database/models/user.model';
import { creatingFailureBody } from '../utils/resBodies'


interface RequestBody {
    email: string;
    password: string;
}


export const loginValidation = async (ctx: Context, next: Next) => {

    const user = ctx.request.body as RequestBody;

    // check data availability
    if (!user.email) { 
        ctx.response.status = 400;
        ctx.response.body = creatingFailureBody('email is required');
        return
    }

    // check data availability
    if (!user.password) { 
        ctx.response.status = 400;
        ctx.response.body = creatingFailureBody('password is required');
        return
    }

    // check if user exists by email
    const existingUser = await User.findOne({ email: user.email });

    if (!existingUser) {
        ctx.status = 400;
        ctx.body = creatingFailureBody('this user is not registered yet');
        return;
    }

    // hash the password
    dotenv.config();
    const salt: string = process.env.SALT_ROUNDS || "";
    const hashedPassword = await bcrypt.hash(user.password, salt);


    // check password compatibility
    if (existingUser.password !== hashedPassword) {
        ctx.status = 400;
        ctx.body = creatingFailureBody('the password is incorrect');
        return;
    }

    await next();
}