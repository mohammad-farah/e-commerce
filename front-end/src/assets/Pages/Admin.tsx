import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { OrdersAdminTable } from '../Layouts/AdminPageLayouts/OrdersAdminTable';
import { ProductAdminTabel } from '../Layouts/AdminPageLayouts/ProductsAdminTable';

export const Admin = () => {
  const [selectedComponent, setSelectedComponent] = useState<string>('Orders');

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case 'Orders':
        return <OrdersAdminTable />;
      case 'Products':
        return <ProductAdminTabel />;
      default:
        return <OrdersAdminTable />;
    }
  };

  return (
    <Box sx={{ p: 3  , mt: 11}}>
      <Box sx={{ display: 'flex', gap: 2, justifyContent : 'center' ,  mb: 3 }}>
        <Button variant={selectedComponent === 'Orders' ? 'contained' : 'outlined'} onClick={() => setSelectedComponent('Orders')}>
          Orders
        </Button>
        <Button variant={selectedComponent === 'Products' ? 'contained' : 'outlined'} onClick={() => setSelectedComponent('Products')}>
          Products
        </Button>
      </Box>

      <Typography variant="h5" sx={{ mb: 10 , textAlign : 'center' , textDecoration: 'underline' }}>
        {selectedComponent} Management
      </Typography>


      {renderSelectedComponent()}
    </Box>
  );
};
