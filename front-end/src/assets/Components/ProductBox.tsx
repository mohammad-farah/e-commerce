import Box from '@mui/material/Box';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Button, Typography, CircularProgress, Snackbar, IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useState } from 'react';

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
  productId: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export function Product({ productId, name, price, description, image }: ProductProps) {
  const [cookies] = useCookies(['token']);
  const token = cookies.token;

  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [snackbarIcon, setSnackbarIcon] = useState<React.ReactNode | null>(null);

  // Function to add a product to the cart
  const AddProductToTheCart = async (id: string) => {
    // Check if the user is logged in
    if (!token) {
      setErrorMessage('Please log in to add products to your cart.');
      setSnackbarIcon(<ErrorIcon sx={{ mr: 1 }} />);
      setSnackbarOpen(true);
      return;
    }

    setLoading(true);

    try {
      // API request to add the product to the cart
      await axios.post<CartResponse>(
        'http://127.0.0.1:8000/cart',
        { productId: id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setErrorMessage('Product added to cart!');
      setSnackbarIcon(<CheckCircleIcon sx={{ mr: 1 }} />);
    } catch (error) {
      console.error('Error adding product:', error);
      setErrorMessage('Failed to add product to cart.');
      setSnackbarIcon(<ErrorIcon sx={{ mr: 1 }} />);
    } finally {
      setSnackbarOpen(true);
      setLoading(false);
    }
  };

  // Function to handle closing the Snackbar
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        m: {
          xs: '5%',   // Margin for small screens
          md: '1.66%' // Margin for medium screens and up
        },
        width: {
          xs: '90%',  // Width for small screens
          md: '30%'   // Width for medium screens and up
        },
        fontFamily: 'Arial'
      }}
    >
      <Box
        sx={{
          backgroundImage: `url(${image})`,
          width: '100%',
          height: 300,
          backgroundPosition: 'center center',
          backgroundSize: 'cover'
        }}
      >
        <Box
          sx={{
            py: 2,
            px: 2,
            fontFamily: 'Arial',
            backgroundColor: 'rgba(0,0,0,0.8)',
            color: 'white'
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Typography sx={{ textTransform: 'uppercase', fontWeight: 'bold', mr: 1 }}>
              {name}
            </Typography>
            -
            <Typography color='primary' sx={{ textTransform: 'uppercase', fontWeight: 'bold', ml: 1 }}>
              {price}$
            </Typography>
          </Box>

          <Typography sx={{ textTransform: 'lowercase', fontSize: '.8rem', mt: 1 }}>
            {description}
          </Typography>

          <Button
            color='primary'
            startIcon={loading ? <CircularProgress size={14} /> : <AddShoppingCartIcon />}
            sx={{ fontSize: '.8rem', mt: 1 }}
            onClick={() => AddProductToTheCart(productId)}
            variant='outlined'
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add to cart'}
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={
          <span style={{ display: 'flex', alignItems: 'center' }}>
            {snackbarIcon} {errorMessage}
          </span>
        }
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackbar}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Box>
  );
}
