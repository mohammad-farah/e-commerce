// core module and types of koa 
import Router from 'koa-router';

// custom modules
import { loginValidator } from '../middleware/login.validator';
import { loginController } from '../controller/login.Controller';



const login: Router = new Router();

login.post('/', 
    loginValidator,
    loginController
);

export default login;