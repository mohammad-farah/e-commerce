import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Switch, TextField, Box } from '@mui/material';
import { useCookies } from 'react-cookie';
import { Snackbar, Alert } from '@mui/material';

interface Order {
  _id: string;
  userId: string;
  status: 'pending' | 'delivered';
}

export const OrdersAdminTable = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [cookies] = useCookies(['token']);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8000/orders', {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        });
        setOrders(response.data.data.orders);
        setFilteredOrders(response.data.data.orders);
      } catch (error) {
        console.error('Failed to fetch orders', error);
        setSnackbarMessage('Failed to fetch orders');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    };

    fetchOrders();
  }, [cookies.token]);

  const handleStatusChange = async (orderId: string, newStatus: 'pending' | 'delivered') => {
    try {
      await axios.patch(
        `http://localhost:8000/orders/${orderId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );

      filterOrders(searchTerm);

      setSnackbarMessage('Order status updated successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Failed to update order status', error);
      setSnackbarMessage('Failed to update order status');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const toggleStatus = (order: Order) => {
    const newStatus = order.status === 'pending' ? 'delivered' : 'pending';
    handleStatusChange(order._id, newStatus);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    filterOrders(term);
  };

  const filterOrders = (term: string) => {
    if (term === '') {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter((order) => order._id.includes(term));
      setFilteredOrders(filtered);
    }
  };

  return (

    <Box sx={{ my: 3, mx: 'auto', width: '90%' }}>
      <TextField
        label="Search by Order ID"
        variant="outlined"
        fullWidth
        sx={{ mb: 2, width: '25%' }}
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <TableContainer component={Paper} >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>User ID</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order._id}</TableCell>
                <TableCell>{order.userId}</TableCell>
                <TableCell>
                  <Switch
                    checked={order.status === 'delivered'}
                    onChange={() => toggleStatus(order)}
                    color="primary"
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                  {order.status === 'delivered' ? 'Delivered' : 'Pending'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
        >
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity={snackbarSeverity}
            sx={{ width: '100%' }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </TableContainer>
    </Box>
  );
};
