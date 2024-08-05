// core module and types of koa 
import Router from 'koa-router';

// custom modules
import { registrationValidator } from '../middleware/validator.ts/register.middleware';
import { registration } from '../controller/registration.controller';

import { loginValidator } from '../middleware/validator.ts/login.middleware';
import { login } from '../controller/login.controller';


const user : Router = new Router();

user.post('/register/user', 
    registrationValidator,
    registration 
);

user.post('/login/user', 
    loginValidator,
    login
);

export default user;