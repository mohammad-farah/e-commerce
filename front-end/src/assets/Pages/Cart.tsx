import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, IconButton, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';


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
    const navigate = useNavigate();

    const token = cookies.token;

    // Dialog states
    const [open, setOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState<string | null>(null);

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
            await axios.post('http://127.0.0.1:8000/cart', 
                { productId, quantity }, {
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

    const handleDelete = async () => {
        if (productToDelete) {
            try {
                await axios.delete(`http://127.0.0.1:8000/cart/product/${productToDelete}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setOpen(false); // Close dialog
                getUserCart(); // Refresh cart data
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    const handleOpenDialog = (productId: string) => {
        setProductToDelete(productId);
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
        setProductToDelete(null);
    };

    useEffect(() => {
        getUserCart();
    }, [token]);

    const handleCheckout  = () => {
        navigate('/order', {
            state:
            {
                cartId: userCart?._id,
                totalPrice: userCart?.totalPrice
            }
        })
    }

    return (
        <Box
            sx={{
                my: 15,
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
                                        startIcon={<DeleteIcon />}
                                        onClick={() => handleOpenDialog(cartProduct.productId._id)}
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
            <Box sx={{ mt: 2 }}>
                <Typography sx={{ my: 2, mx: 1 }} variant='h5'>{userCart?.totalPrice || 0} $</Typography>
                <Button
                    variant='outlined'
                    onClick={handleCheckout }
                >Checkout
                </Button>
            </Box>

            {/* Delete Confirmation Dialog */}
            <Dialog open={open} onClose={handleCloseDialog}>
                <DialogTitle color='primary'>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this product from your cart?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} variant='outlined'>Cancel</Button>
                    <Button onClick={handleDelete} color="error" variant='outlined'>Delete</Button>
                </DialogActions>
            </Dialog>

        </Box>
    );
};
