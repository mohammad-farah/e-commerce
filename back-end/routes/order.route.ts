import Router from 'koa-router';


const order : Router =  new Router();


order.get('/' , async (ctx) => {
    ctx.body = 'welcome to orders'
});

export default order;