import React, { useState } from 'react';
import axios from 'axios';
import {
  Box, Typography, Paper, TextField, Button, Snackbar, Alert
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

interface OrderProps {
  cartId: string;
  totalPrice: number;
}

export const CkeckOut = () => {
  const location = useLocation();
  const [cookies] = useCookies(['token']);
  const { cartId, totalPrice } = location.state as OrderProps;
  const navigate = useNavigate();

  const token = cookies.token;

  // State to hold form data
  const [shippingDetails, setShippingDetails] = useState({
    address: '',
    city: '',
    zipCode: '',
    country: '',
    phone: '',
    received_by: '',
  });

  const [errors, setErrors] = useState({
    address: '',
    city: '',
    zipCode: '',
    country: '',
    phone: '',
    received_by: '',
  });

  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success'
  });

  // Handle form input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingDetails(prevState => ({
      ...prevState,
      [name]: value,
    }));

    // Clear snackbar when user interacts with the input
    if (snackbar.open) {
      setSnackbar({ ...snackbar, open: false });
    }
  };

  // Handle order submission
  const handleOrder = async () => {
    // Simple validation
    const validationErrors = {
      address: shippingDetails.address ? '' : 'Address is required.',
      city: shippingDetails.city ? '' : 'City is required.',
      zipCode: shippingDetails.zipCode ? '' : 'ZIP Code is required.',
      country: shippingDetails.country ? '' : 'Country is required.',
      phone: shippingDetails.phone ? '' : 'Phone number is required.',
      received_by: shippingDetails.received_by ? '' : 'Name of the person receiving the order is required.',
    };

    if (Object.values(validationErrors).some(error => error)) {
      setErrors(validationErrors);
      return;
    }

    try {
      await axios.post('http://localhost:8000/orders', { cartId, shippingDetails }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Show success snackbar and navigate after a delay
      setSnackbar({ open: true, message: 'Order placed successfully!', severity: 'success' });

      setTimeout(() => {
        navigate('/orders');
      }, 6000); // Matches the Snackbar auto-hide duration
    } catch (error) {
      setSnackbar({ open: true, message: 'Error placing order. Please try again.', severity: 'error' });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ width: '50%', mx: 'auto', my: 15 }}>
      <Typography sx={{ my: 2 }} variant='h4' color='primary'>
        Checkout
      </Typography>

      {/* Cart Details */}
      <Box sx={{ py: 3, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body1">
          <strong>Cart ID: </strong>{cartId}
        </Typography>
        <Typography variant="body1">
          <strong>Total Price:</strong> {totalPrice} $
        </Typography>
      </Box>

      {/* Order Details Form */}
      <Paper sx={{ p: 3 }}>
        <Typography variant='h5' sx={{ mb: 3 }} color='primary'>
          Order Details
        </Typography>

        <TextField
          fullWidth
          label='Received By'
          name='received_by'
          value={shippingDetails.received_by}
          onChange={handleChange}
          sx={{ mb: 2 }}
          error={!!errors.received_by}
          helperText={errors.received_by}
        />

        <TextField
          fullWidth
          label='Phone'
          name='phone'
          value={shippingDetails.phone}
          onChange={handleChange}
          sx={{ mb: 2 }}
          error={!!errors.phone}
          helperText={errors.phone}
        />

        <TextField
          fullWidth
          label='Address'
          name='address'
          value={shippingDetails.address}
          onChange={handleChange}
          sx={{ mb: 2 }}
          error={!!errors.address}
          helperText={errors.address}
        />

        <TextField
          fullWidth
          label='City'
          name='city'
          value={shippingDetails.city}
          onChange={handleChange}
          sx={{ mb: 2 }}
          error={!!errors.city}
          helperText={errors.city}
        />

        <TextField
          fullWidth
          label='ZIP Code'
          name='zipCode'
          value={shippingDetails.zipCode}
          onChange={handleChange}
          sx={{ mb: 2 }}
          error={!!errors.zipCode}
          helperText={errors.zipCode}
        />

        <TextField
          fullWidth
          label='Country'
          name='country'
          value={shippingDetails.country}
          onChange={handleChange}
          sx={{ mb: 2 }}
          error={!!errors.country}
          helperText={errors.country}
        />

        <Button
          variant='outlined'
          color='primary'
          onClick={handleOrder}
        >
          Make an Order
        </Button>
      </Paper>

      {/* Snackbar for Notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};
