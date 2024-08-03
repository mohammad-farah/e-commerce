import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();
const salt: string = process.env.SALT_ROUNDS || "";

export const hashPassword = async ( pwd: string) : Promise<string> => {
    return await bcrypt.hash(pwd, salt);
}