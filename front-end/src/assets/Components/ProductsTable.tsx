import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  IconButton
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

// Define the structure of a Product object
interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

// Define the props for the ProductTable component
interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

// Component to display a table of products with edit and delete options
export const ProductTable: React.FC<ProductTableProps> = ({ products, onEdit, onDelete }) => {
  return (

    <TableContainer component={Paper} sx={{ my: 3, mx: 'auto', width: '90%' }}>

      <Table>
        <TableHead>
          <TableRow>

            {/* Table headers */}
            <TableCell sx={{ fontWeight: 'bold' }}>Product Name</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Price ($)</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
            <TableCell sx={{ fontWeight: 'bold', textAlign: 'right' }}>Actions</TableCell>

          </TableRow>
        </TableHead>

        <TableBody>

          {/* Iterate over products and create a row for each product */}
          {products.map((product) => (

            <TableRow key={product._id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell align="right">

                {/* Edit and Delete action buttons */}
                <IconButton sx={{ color: '#000000' }} onClick={() => onEdit(product)}>
                  <Edit />
                </IconButton>

                <IconButton sx={{ color: '#b71c1c' }} onClick={() => onDelete(product)}>
                  <Delete />
                </IconButton>

              </TableCell>
            </TableRow>

          ))}
        </TableBody>
      </Table>
      
    </TableContainer>
  );
};
