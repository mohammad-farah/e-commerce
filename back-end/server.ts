import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router  from 'koa-router';
import cors from 'koa2-cors'
import dotenv from 'dotenv'; 

// database connection modules
import dbConnection from './database/db.connection';

// routes modules 
import user from './routes/user.route'
import product from './routes/product.route';
import cart from './routes/cart.route';
import order from './routes/order.route';

const app = new Koa();
const router : Router = new Router();

// server middlewares 
app.use(bodyParser())
app.use(cors ({ origin : '*' }))

// Initiate database connection
dbConnection();


router.use('/user' , user.routes());
router.use('/products' , product.routes());
router.use('/cart' , cart.routes());
router.use('/orders' , order.routes());


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