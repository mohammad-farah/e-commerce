import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

interface CheckOutProps {
    cartId: string;
    totalPrice: number;
}

export const CheckOut = () => {
    const location = useLocation();
    const { cartId, totalPrice } = location.state as CheckOutProps;

    // State to hold form data
    const [shippingDetails, setShippingDetails] = useState({
        address: '',
        city: '',
        zipCode: '',
        country: '',
        phone: '',
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
            const response = await axios.post('http://localhost:8000/orders', {
                cartId,
                shippingDetails,
            });

            console.log('Order response:', response.data);
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                my: 5,
                mx: 'auto',
                width: '90%',
            }}
        >
            {/* Left Side - Cart Summary */}
            <Box sx={{ width: '45%' }}>
                <Typography variant='h6'>Order Summary</Typography>
                <Typography>Cart ID: {cartId}</Typography>
                <Typography>Total Price: ${totalPrice}</Typography>
            </Box>

            {/* Right Side - Shipping Form */}
            <Box
                sx={{
                    width: '45%',
                    p: 3,
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                }}
            >
                <Typography variant='h5' sx={{ mb: 3 }}>
                    Shipping Details
                </Typography>

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

                <TextField
                    fullWidth
                    label='Phone'
                    name='phone'
                    value={shippingDetails.phone}
                    onChange={handleChange}
                    sx={{ mb: 4 }}
                />

                <Button
                    variant='contained'
                    color='primary'
                    onClick={handleOrder}
                >
                    Make an Order
                </Button>
            </Box>
        </Box>
    );
};
