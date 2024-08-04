// core module and types of koa 
import Router from 'koa-router';

// custom modules
import { registrationValidator } from '../middleware/register.validator';
import { registration } from '../controller/registration.controller';

import { loginValidator } from '../middleware/login.validator';
import { login } from '../controller/login.controller';


const user : Router = new Router();

user.post('/register', 
    registrationValidator,
    registration 
);

user.post('/login', 
    loginValidator,
    login
);

export default user;