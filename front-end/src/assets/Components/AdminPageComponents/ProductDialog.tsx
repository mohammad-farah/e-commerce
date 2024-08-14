import React, { useState } from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Grid
} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ImageUploadButton } from './ImageUploadBtn';

// Define the structure of a Product object
interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

// Define the props for the ProductDialog component
interface ProductDialogProps {
  open: boolean;
  product: Product | null;
  action: string;  // 'edit', 'add', or 'delete'
  onClose: () => void;
  onConfirm: () => void;
  setProduct: React.Dispatch<React.SetStateAction<Product | null>>;
  categories: string[];
  defaultCategory: string;
}

export const ProductDialog: React.FC<ProductDialogProps> = ({
  open, product, action, onClose, onConfirm, setProduct, categories, defaultCategory
}) => {

  const [newCategory, setNewCategory] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    price: '',
    category: '',
    description: ''
  });

  // Handle new category change
  const handleNewCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCategoryLowerCase = e.target.value.toLowerCase();
    setNewCategory(newCategoryLowerCase);
  };

  // Handle image upload and update the product state
  const handleImageUpload = (base64Image: string) => {
    setProduct(prevProduct => prevProduct ? { ...prevProduct, image: base64Image } : null);
  };

  // Handle category selection
  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setProduct(prevProduct => prevProduct ? { ...prevProduct, category: event.target.value } : null);
  };

  // Add new category
  const addNewCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setProduct(prevProduct => prevProduct ? { ...prevProduct, category: newCategory } : null);
      setNewCategory('');
    }
  };

  // Validate inputs
  const validateInputs = () => {
    const validationErrors = {
      name: product?.name ? '' : 'Name is required.',
      price: product?.price ? '' : 'Price is required.',
      category: product?.category ? '' : 'Category is required.',
      description: product?.description ? '' : 'Description is required.',
    };

    setErrors(validationErrors);

    return !Object.values(validationErrors).some(error => error);
  };

  // Handle confirm action
  const handleConfirm = () => {
    if (validateInputs()) {
      onConfirm();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle color='primary'>
        {action === 'edit' ? 'Edit Product' : action === 'add' ? 'Add Product' : 'Delete Product'}
      </DialogTitle>
      <DialogContent>
        {action !== 'delete' ? (
          <Grid container spacing={2}>
            {/* Left Side: Form */}
            <Grid item xs={12} md={8}>
              <form>
                {/* Product Name Input */}
                <TextField sx={{ my: 1 }}
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Name"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={product?.name || ''}
                  onChange={(e) => setProduct(prevProduct => prevProduct ? { ...prevProduct, name: e.target.value } : null)}
                  error={!!errors.name}
                  helperText={errors.name}
                />

                {/* Product Price Input */}
                <TextField sx={{ my: 1 }}
                  margin="dense"
                  id="price"
                  label="Price"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={product?.price || ''}
                  onChange={(e) => setProduct(prevProduct => prevProduct ? { ...prevProduct, price: Number(e.target.value) } : null)}
                  error={!!errors.price}
                  helperText={errors.price}
                />

                {/* Category Select Input */}
                <FormControl fullWidth sx={{ my: 1 }}>
                  <InputLabel id="category-select-label">Category</InputLabel>
                  <Select
                    labelId="category-select-label"
                    id="category-select"
                    value={product?.category || defaultCategory}
                    label="Category"
                    onChange={handleCategoryChange}
                    error={!!errors.category}
                  >
                    {categories.map(category => (
                      <MenuItem key={category} value={category}>{category}</MenuItem>
                    ))}
                  </Select>
                  {errors.category && <p style={{ color: 'red' }}>{errors.category}</p>}
                </FormControl>

                {/* New Category Input */}
                <TextField sx={{ my: 1 }}
                  margin="dense"
                  id="new-category"
                  label="Add New Category"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={newCategory}
                  onChange={handleNewCategoryChange}
                  onBlur={addNewCategory} // Add new category when input loses focus
                />

                {/* Product Description Input */}
                <TextField sx={{ my: 1 }}
                  margin="dense"
                  id="description"
                  label="Description"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={product?.description || ''}
                  onChange={(e) => setProduct(prevProduct => prevProduct ? { ...prevProduct, description: e.target.value } : null)}
                  error={!!errors.description}
                  helperText={errors.description}
                />
              </form>
            </Grid>

            {/* Right Side: Image Upload and Display */}
            <Grid item xs={12} md={4}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                {/* Display the uploaded image */}
                {product?.image && <img src={product.image} alt="Product" style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }} />}
                {/* Image Upload Button */}
                <ImageUploadButton onImageUpload={handleImageUpload} />
              </div>
            </Grid>
          </Grid>
        ) : (
          <p>Are you sure you want to delete the product <strong>{product?.name}</strong>?</p>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant='outlined'>Cancel</Button>
        <Button onClick={handleConfirm} color="primary" variant="contained">
          {action === 'edit' ? 'Save Changes' : action === 'add' ? 'Add Product' : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
