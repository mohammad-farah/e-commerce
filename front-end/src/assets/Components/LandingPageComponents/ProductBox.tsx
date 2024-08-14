import Box from '@mui/material/Box';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Button, Typography, CircularProgress, Snackbar, IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';

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
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarIcon, setSnackbarIcon] = useState<React.ReactNode | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (snackbarOpen) {
      timer = setTimeout(() => {
        setSnackbarOpen(false);
      }, 1000); // Set to 1 second (1000 milliseconds)
    }
    return () => clearTimeout(timer); // Clear timeout if snackbar closes or component unmounts
  }, [snackbarOpen]);

  // Function to add a product to the cart
  const AddProductToTheCart = async (id: string) => {
    if (!token) {
      setSnackbarMessage('Please log in to add products to your cart.');
      setSnackbarIcon(<ErrorIcon sx={{ mr: 1 }} />);
      setSnackbarOpen(true);
      return;
    }

    setLoading(true);

    try {
      await axios.post<CartResponse>(
        'http://127.0.0.1:8000/cart',
        { productId: id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSnackbarMessage('Product added to cart!');
      setSnackbarIcon(<CheckCircleIcon sx={{ mr: 1 }} />);
    } catch (error) {
      console.error('Error adding product:', error);
      setSnackbarMessage('Failed to add product to cart.');
      setSnackbarIcon(<ErrorIcon sx={{ mr: 1 }} />);
    } finally {
      setSnackbarOpen(true);
      setLoading(false);
    }
  };

  // Function to handle closing the Snackbar
  const handleSnackbarClose = () => {
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
        fontFamily: 'Arial',
        transition: 'transform 0.3s ease-in-out', // Smooth transition effect
        '&:hover': {
          transform: 'scale(1.05)' // Slightly increase size on hover
        }
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
            <Typography color='primary' sx={{ textTransform: 'uppercase', fontWeight: 'bold', ml: 1 }}>
              {price}$
            </Typography>
          </Box>

          {/* Description with max height and ellipsis */}
          <Typography
            sx={{
              textTransform: 'lowercase',
              fontSize: '.8rem',
              mt: 1,
              overflow: 'auto', // Set to 'auto' to enable scrolling
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2, // Limit the number of lines
              WebkitBoxOrient: 'vertical',
              height: '3rem', // Adjust based on the number of lines
              scrollbarWidth: 'none', // Hide scrollbar for Firefox
              msOverflowStyle: 'none', // Hide scrollbar for Internet Explorer and Edge
              '&::-webkit-scrollbar': {
                display: 'none' // Hide scrollbar for Webkit browsers (Chrome, Safari)
              }
            }}
          >
            {description}
          </Typography>

          <Button
            color='primary'
            startIcon={loading ? <CircularProgress size={14} /> : <AddShoppingCartIcon />}
            sx={{ fontSize: '.8rem', mt: 2 }}
            onClick={() => AddProductToTheCart(productId)}
            variant='outlined'
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add to cart'}
          </Button>
        </Box>
      </Box>

      {/* Snackbar component */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={null} // Disable automatic hiding
        onClose={handleSnackbarClose}
        message={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {snackbarIcon}
            {snackbarMessage}
          </Box>
        }
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleSnackbarClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
        ContentProps={{
          sx: {
            display: 'flex',
            alignItems: 'center',
          }
        }}
      />
    </Box>
  );
}
