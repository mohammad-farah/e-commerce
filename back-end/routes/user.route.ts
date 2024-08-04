// core module and types of koa 
import Router from 'koa-router';

// custom modules
import { registrationValidator } from '../middleware/register.validator';
import { registrationController } from '../controller/registration.controller';
import { loginValidator } from '../middleware/login.validator';
import { loginController } from '../controller/login.Controller';


const user : Router = new Router();

user.post('/register', 
    registrationValidator,
    registrationController 
);

user.post('/login', 
    loginValidator,
    loginController
);

export default user;