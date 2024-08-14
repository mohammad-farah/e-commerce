import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { useCookies } from 'react-cookie';

interface Order {
  _id: string;
  createdAt: string;
  totalPrice: number;
  status: string;
}

export const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [cookies] = useCookies(['token']);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8000/orders', {
          headers: { Authorization: `Bearer ${cookies.token}` },
        });

        setOrders(response.data.data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [cookies.token]);

  return (
    <Box sx={{ width: '90%', mx: 'auto', my: 15 }}>
      <Typography variant="h4" sx={{ mb: 3 }} color="primary">
        Your Orders
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Order ID</strong></TableCell>
              <TableCell><strong>Order Time</strong></TableCell>
              <TableCell><strong>Total Price</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map(order => (
              <TableRow key={order._id}>
                <TableCell>{order._id}</TableCell>
                <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
                <TableCell>{order.totalPrice} $</TableCell>
                <TableCell>{order.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
