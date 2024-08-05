import Router from 'koa-router';
import { 
    addOrUpdateProductInCart,
    removeProductFromCart,
    removeCart,
    getUserCart
} from '../controller/carts.controller';
import { userAuthValidator } from '../middleware/user.middleware';

const cart = new Router();

cart.post('/', 
    userAuthValidator,
    addOrUpdateProductInCart
);

cart.delete('/',
    userAuthValidator,
    removeCart
);

cart.get('/',
    userAuthValidator,
    getUserCart
);


cart.delete('/product/:productId',
     userAuthValidator,
     removeProductFromCart
);



export default cart;
