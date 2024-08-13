import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

import { ProductTable } from '../Components/ProductsTable';
import { ProductDialog } from '../Components/ProductDialog';
import { fetchCategories } from '../../Services/fetchCategories';
import { Box } from '@mui/material';
import { ProductFilter } from './../Components/ProductFilter';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

interface ProductsResponse {
  status: string;
  message: string;
  data: { products: Product[] };
}

export const Admin: React.FC = () => {

  const [open, setOpen] = useState(false);
  const [cookies,] = useCookies(['token']);
  const [action, setAction] = useState('');

  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const [responseProducts, setResponseProducts] = useState<ProductsResponse>({
    status: '',
    message: '',
    data: { products: [] }
  });

  const [categories, setCategories] = useState<string[]>([]);

  const token = cookies.token;

  const getProductsByCategoryName = async () => {
    if (!selectedCategory) return;
    try {
      const response = await axios.get<ProductsResponse>(
        `http://127.0.0.1:8000/products/category/${selectedCategory}`
      );
      setResponseProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const deleteProduct = async () => {
    try {
      await axios.delete<ProductsResponse>(`http://localhost:8000/products/${currentProduct?._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // refresh the products after deletion
      getProductsByCategoryName();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const editProduct = async () => {
    try {
      await axios.put<ProductsResponse>(`http://127.0.0.1:8000/products/${currentProduct?._id}`, {
        category: currentProduct?.category,
        price: currentProduct?.price,
        name: currentProduct?.name,
        description: currentProduct?.description,
        image: currentProduct?.image
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // refresh products after editing
      getProductsByCategoryName();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const addProduct = async () => {
    try {
      await axios.post<ProductsResponse>('http://127.0.0.1:8000/products', {
        category: currentProduct?.category,
        price: currentProduct?.price,
        name: currentProduct?.name,
        description: currentProduct?.description,
        image: currentProduct?.image
      }, { headers: { Authorization: `Bearer ${token}` } });
      // Refresh products after adding
      getProductsByCategoryName();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleOpen = (product: Product, actionType: string) => {
    setCurrentProduct(product);
    setAction(actionType);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentProduct(null);
  };

  const handleConfirm = () => {
    if (action === 'edit' && currentProduct) {
      editProduct();
    } else if (action === 'delete' && currentProduct) {
      deleteProduct();
    } else if (action === 'add' && currentProduct) {
      addProduct();
    }
    handleClose();
  };

  const getCategories = async () => {
    try {
      const response = await fetchCategories();
      setCategories(response.data.categories);
      setSelectedCategory(response.data.categories[0]); // Set initial category
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleFilteredCategory = (selectedCategory: string) => {
    setSelectedCategory(selectedCategory);
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      getProductsByCategoryName();
    }
  }, [selectedCategory]);

  return (
    <>
      <br /><br /><br />
      <Box sx={{
        display: 'flex',
        direction: 'row',
        justifyContent: 'space-between',
        width: '90%',
        my: 3,
        mx: 'auto',
      }}>
        {/* create filters for product table */}
        <ProductFilter
          categories={categories}
          setSelectedCategories={handleFilteredCategory}
          defaultCategory={selectedCategory}
        />

        {/* create btn for adding new product */}
        <Button
          variant="outlined"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpen({ _id: '', name: '', price: 0, category: selectedCategory, description: '', image: '' }, 'add')}
        >
          Add New Product
        </Button>

      </Box>

      <ProductTable
        products={responseProducts.data.products}
        onEdit={(product) => handleOpen(product, 'edit')}
        onDelete={(product) => handleOpen(product, 'delete')}
      />
      <ProductDialog
        open={open}
        product={currentProduct}
        action={action}
        onClose={handleClose}
        onConfirm={handleConfirm}
        setProduct={setCurrentProduct}
        categories={categories} // Pass the categories here
        defaultCategory={selectedCategory}
      />

    </>
  );
};
