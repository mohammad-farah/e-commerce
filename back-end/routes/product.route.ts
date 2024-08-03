import Router from 'koa-router';


const product : Router =  new Router();


product.get('/' , async (ctx) => {
    ctx.body = 'welcome to products'
});

export default product;