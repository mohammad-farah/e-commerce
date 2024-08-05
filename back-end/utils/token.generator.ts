import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'


dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || '';
const EXPIRES_IN = process.env.EXPIRES_IN || '24h';

export const generateToken =  (userId : string , pasword : string,  role : string ) => {
    return jwt.sign( {
        id : userId,
        password : pasword,
        role : role
    }, 
    SECRET_KEY,
    { expiresIn: EXPIRES_IN });
}

