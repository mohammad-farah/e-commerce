// core module and types of koa 
import Router from 'koa-router';

// custom modules
import { registrationValidator } from '../middleware/register.validator';
import { registrationController } from '../controller/registration.controller';


const register: Router = new Router();

register.post('/', 
    registrationValidator,
    registrationController 
);

export default register;