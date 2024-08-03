import Router from 'koa-router';


const cart : Router =  new Router();


cart.get('/' , async (ctx) => {
    ctx.body = 'welcome to carts'
});

export default cart;