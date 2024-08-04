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
        ctx.response.status = 422;
        ctx.response.body = raiseWarning('Email is required');
        return
    }

    // check data availability
    if (!user.password) { 
        ctx.response.status = 422;
        ctx.response.body = raiseWarning('Password is required');
        return
    }

    // check if user exists by email
    const existUser = await User.findOne({ email: user.email });

    if (!existUser) {
        ctx.status = 406;
        ctx.body = raiseWarning('This user is not registered yet');
        return;
    }

    // hash the password
    const hashedPassword : string = await hashPassword(user.password);

    // check password compatibility
    if ( existUser.password !== hashedPassword) {
        ctx.status = 406;
        ctx.body = raiseWarning('password is incorrect');
        return;
    }

    // reduce the requests to the database
    // for generating tokens at the controller which is the next middleware
    ctx.userData = {
        id : existUser.id,
        pwd : existUser.password,
        role: existUser.role
    }

    await next();
}