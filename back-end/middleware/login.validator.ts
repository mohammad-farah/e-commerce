// core module and types of koa 
import { Context , Next } from 'koa'

// custom modules and functionality
import User from '../database/models/user.model';
import { raiseWarning } from '../utils/resBodies'
import { hashPassword } from '../utils/genHash';


interface RequestBody {
    email: string;
    password: string;
}


export const loginValidator = async (ctx: Context, next: Next) : Promise<void> => {

    const user : RequestBody = ctx.request.body as RequestBody;

    // check data availability
    if (!user.email) { 
        ctx.response.status = 400;
        ctx.response.body = raiseWarning('email is required');
        return
    }

    // check data availability
    if (!user.password) { 
        ctx.response.status = 400;
        ctx.response.body = raiseWarning('password is required');
        return
    }

    // check if user exists by email
    const existUser = await User.findOne({ email: user.email });

    if (!existUser) {
        ctx.status = 400;
        ctx.body = raiseWarning('this user is not registered yet');
        return;
    }

    // hash the password
    const hashedPassword : string = await hashPassword(user.password);

    // check password compatibility
    if ( existUser.password !== hashedPassword) {
        ctx.status = 400;
        ctx.body = raiseWarning('the password is incorrect');
        return;
    }

    await next();
}