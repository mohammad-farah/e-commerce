import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, IconButton, Button } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import DeleteIcon from '@mui/icons-material/Delete';

interface CartProduct {
    _id: string;
    productId: {
        _id: string;
        name: string;
        price: number;
    };
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

export const Cart = () => {
    const [userCart, setUserCart] = useState<Cart | null>(null);
    const [cookies] = useCookies(['token']);
    const token = cookies.token;

    const getUserCart = async () => {
        try {
            const response = await axios.get<CartResponse>('http://127.0.0.1:8000/cart', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUserCart(response.data.data.cart);
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    const updateQuantity = async (productId: string, quantity: number) => {
        try {
            await axios.post('http://127.0.0.1:8000/cart', { productId, quantity }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            getUserCart(); // Refresh cart data
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    const handleIncrement = (productId: string, currentQuantity: number) => {
        updateQuantity(productId, currentQuantity + 1);
    };

    const handleDecrement = (productId: string, currentQuantity: number) => {
        if (currentQuantity > 1) { // Ensure quantity does not go below 1
            updateQuantity(productId, currentQuantity - 1);
        }
    };

    const handleDelete = async (productId: string) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/cart/product/${productId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            getUserCart(); // Refresh cart data
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    useEffect(() => {
        getUserCart();
    }, [token]);

    return (
        <Box
            sx={{
                mt: 15,
                width: '90%',
                mx: 'auto'
            }}
        >
            <Typography variant='h4' color='primary'>Cart</Typography>

            {/* Cart table */}
            <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>

                    <TableHead>
                        <TableRow>
                            <TableCell align="left" sx={{ width: '20%' }}>Total</TableCell>
                            <TableCell align="left" sx={{ width: '20%' }}>Price of one Item</TableCell>
                            <TableCell align="left" sx={{ width: '20%' }}>Quantity</TableCell>
                            <TableCell align="left" sx={{ width: '20%' }}>Product Name</TableCell>
                            <TableCell align="left" sx={{ width: '20%' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {userCart?.products.map((cartProduct) => (

                            <TableRow key={cartProduct.productId._id}>

                                <TableCell align="left">{cartProduct.productId.price * cartProduct.quantity} $</TableCell>

                                <TableCell align="left">{cartProduct.productId.price} $</TableCell>

                                <TableCell align="left">

                                    <IconButton
                                        sx={{ mx: 2 }}
                                        onClick={() => handleDecrement(cartProduct.productId._id, cartProduct.quantity)}
                                    >
                                        <ArrowCircleDownIcon />
                                    </IconButton>

                                    {cartProduct.quantity}
                                    <IconButton
                                        sx={{ mx: 2 }}
                                        onClick={() => handleIncrement(cartProduct.productId._id, cartProduct.quantity)}
                                    >
                                        <ArrowCircleUpIcon />
                                    </IconButton>
                                </TableCell>


                                <TableCell>{cartProduct.productId.name}</TableCell>

                                <TableCell align="left">
                                    <Button
                                    startIcon={<DeleteIcon/>}
                                    onClick={() => handleDelete(cartProduct.productId._id)}
                                    >
                                     Remove Product
                                    </Button>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Total Price */}
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{  display: 'flex', justifyContent: 'flex-start'}}>
                    <Typography variant='h6' color='primary'>Total Price: </Typography>
                    <Typography sx={{ mx: 2 }} variant='h6'>{userCart?.totalPrice || 0} $</Typography>
                </Box>
                <Button variant='outlined'>
                    Place an Order
                </Button>
            </Box>
        </Box>
    );
};
