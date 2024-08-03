import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router  from 'koa-router';
import cors from 'koa2-cors'
import dotenv from 'dotenv'; 

const app = new Koa();
const router : Router = new Router();

// server middlewares 
app.use(bodyParser())
app.use(cors ({ origin : '*' }))



// routes modules 
import register from './routes/register.route'
import login from './routes/login.route';


router.use('/register' , register.routes());
router.use('/login' , login.routes());
router.use('/products' , login.routes());
router.use('/carts' , login.routes());
router.use('/cart' , login.routes());



// high route middleware
// routing all the middleware routes in ./routes folder 
app.use(router.routes())
app.use(router.allowedMethods());


// server url configurations
dotenv.config(); 
const PORT  = process.env.PORT|| 8000;
const DOMAIN : string  = process.env.DOMAIN || 'localhost';


// server initiation
app.listen(PORT, () => {
  console.log(`Back-end Server is running on http://${DOMAIN}:${PORT}`);
})
.on ( 'error', error => {
    console.error(`ERROR in ( Koa server ) running ${ error}`);    
})