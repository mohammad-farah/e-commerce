import { Context, Next } from 'koa';
import jwt from 'jsonwebtoken';
import { raiseWarning } from '../utils/response.beautifier';

import dotenv from 'dotenv';
dotenv.config();


export interface DecodedToken {
    id: string;
    role: string;
    iat?: number;
    exp?: number;
}
  

export const userAuthValidator = async (ctx: Context, next: Next) => {
  try {

     const JWT_SECRET = process.env.SECRET_KEY as string;

    // Extract token from the Authorization header
    const authHeader = ctx.headers.authorization;

    if (!authHeader) {
      ctx.status = 401;
      ctx.body = raiseWarning('Authorization header missing');
      return;
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      ctx.status = 401;
      ctx.body = raiseWarning('Token missing or it must be Bearer token');
      return;
    }

    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;

    // pass the user information to the nex middleware
    ctx.state.user = {
      id: decoded.id,
      role: decoded.role,
    };
    
    
    // Proceed to the next middleware or route handler
    await next();

  } catch (error) {
    // Handle token verification errors
    ctx.status = 401;
    ctx.body = raiseWarning('Invalid or expired token');
    console.error('Auth Middleware Error:', error);
  }
};
