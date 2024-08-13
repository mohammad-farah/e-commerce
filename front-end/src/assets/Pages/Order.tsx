import React, { useState } from 'react';
import axios from 'axios';
import { Box, Grid, Typography, Paper, TextField, Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';

interface OrderProps {
    cartId: string;
    totalPrice: number;
}

export const Order = () => {
    const location = useLocation();
    const [cookies] = useCookies(['token']);
    const { cartId, totalPrice } = location.state as OrderProps;

    const token = cookies.token;
    // State to hold form data
    const [shippingDetails, setShippingDetails] = useState({
        address: '',
        city: '',
        zipCode: '',
        country: '',
        phone: '',
        received_by: '', // Ensure this matches the form field name
    });

    // Handle form input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setShippingDetails(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle order submission
    const handleOrder = async () => {
        try {
            const response = await axios.post('http://localhost:8000/orders', { cartId, shippingDetails }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log('Order response:', response.data);
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    return (
        <Box sx={{ width: '90%', mx: 'auto', my: 15 }}>
            <Typography sx={{ my: 2 }} variant='h4' color='primary'>
                Order and Checkout
            </Typography>

            <Grid container spacing={3}>
                {/* Left part: Cart Summary */}
                <Grid item xs={12} md={5}>
                    <Paper sx={{ p: 3 }}>
                        <Typography sx={{ mb: 2 }} variant="h5" color='primary'>
                            Cart Details
                        </Typography>

                        <Typography variant="body1">
                            <strong>Cart ID: </strong>{cartId}
                        </Typography>

                        <Typography variant="body1" sx={{ mt: 2 }}>
                            <strong>Total Price:</strong> {totalPrice} $
                        </Typography>
                    </Paper>
                </Grid>

                {/* Right part: Shipping Details Form */}
                <Grid item xs={12} md={7}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant='h5' sx={{ mb: 3 }} color='primary'>
                            Order Details
                        </Typography>

                        <TextField
                            fullWidth
                            label='Received By'
                            name='received_by' // Updated to match state key
                            value={shippingDetails.received_by}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                        />

                        <TextField
                            fullWidth
                            label='Phone'
                            name='phone'
                            value={shippingDetails.phone}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                        />

                        <TextField
                            fullWidth
                            label='Address'
                            name='address'
                            value={shippingDetails.address}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                        />

                        <TextField
                            fullWidth
                            label='City'
                            name='city'
                            value={shippingDetails.city}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                        />

                        <TextField
                            fullWidth
                            label='ZIP Code'
                            name='zipCode'
                            value={shippingDetails.zipCode}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                        />

                        <TextField
                            fullWidth
                            label='Country'
                            name='country'
                            value={shippingDetails.country}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                        />

                        <Button
                            variant='contained'
                            color='primary'
                            onClick={handleOrder}
                        >
                            Make an Order
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};
