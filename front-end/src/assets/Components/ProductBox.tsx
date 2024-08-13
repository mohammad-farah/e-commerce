import Box from '@mui/material/Box';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Button, Typography } from '@mui/material';
import axios from 'axios';
import { useCookies } from 'react-cookie';


interface CartProduct {
  productId: string;
  quantity: number;
}

interface Cart {
  userId: string;
  products: CartProduct[];
  totalPrice: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

interface CartResponse {
  status: string;
  message: string;
  data: {
    cart: Cart;
  };
}


interface ProductProps {
  ProductId: string,
  name: string,
  price: number,
  description: string,
  image: string
}

export function Product({ ProductId, name, price, description, image }: ProductProps) {

  const [cookies,] = useCookies(['token']);
  const token = cookies.token;

  const AddProductTotheCart = async (id: string) => {
    try {
      await axios.post<CartResponse>('http://127.0.0.1:8000/cart', {
        productId : id ,
        quantity : 1
      }, { headers: { Authorization: `Bearer ${token}` } });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  }

  return (

    <Box sx={{ m: () => `${10 / 6}%`, width: '30%', fontFamily: 'Arial' }}>

      <Box sx={{
        backgroundImage: `url(${image})`,
        width: '100%',
        height: 300,
        backgroundPosition: 'center center',
        backgroundSize: 'cover'
      }}>

        {/* product details  */}
        <Box sx={{
          py: 2,
          px: 2,
          fontFamily: 'Arial',
          backgroundColor: 'rgba(0,0,0,0.8)',
          color: 'white'
        }}>

          <Box sx={{ display: 'flex', direction: 'row'}}>
            <Typography
              sx={{ textTransform: 'uppercase', fontWeight: 'bold' , mr : 1 }}
            >{name}
            </Typography>
            -
            <Typography color='primary'
            sx={{ textTransform: 'uppercase', fontWeight: 'bold' , ml : 1 }}
            > {price}$
            </Typography>
          </Box>

          <Typography sx={{ textTransform: 'lowercase', fontSize: '.8rem', mt: 1 }} >
            {description}
          </Typography>

          <Button
            color='primary'
            startIcon={<AddShoppingCartIcon />}
            sx={{ fontSize: '.8rem', mt: 1 }}
            onClick={() => AddProductTotheCart(ProductId)}
            variant='outlined'
          > Add to cart
          </Button>

        </Box>
      </Box>
    </Box>
  );
}
