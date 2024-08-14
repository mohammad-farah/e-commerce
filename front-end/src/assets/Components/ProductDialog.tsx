import React from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField
} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
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

// Component to display a dialog for adding, editing, or deleting a product
export const ProductDialog: React.FC<ProductDialogProps> = ({
  open, product, action, onClose, onConfirm, setProduct, categories, defaultCategory
}) => {

  // Handle image upload and update the product state
  const handleImageUpload = (base64Image: string) => {
    setProduct(prevProduct => prevProduct ? { ...prevProduct, image: base64Image } : null);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle color='primary'>
        {action === 'edit' ? 'Edit Product' : action === 'add' ? 'Add Product' : 'Delete Product'}
      </DialogTitle>
      <DialogContent>
        {action !== 'delete' ? (
          // Form to add or edit a product
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
              value={product?.name || ' '}
              onChange={(e) => setProduct(prevProduct => prevProduct ? { ...prevProduct, name: e.target.value } : null)}
            />

            {/* Product Price Input */}
            <TextField sx={{ my: 1 }}
              margin="dense"
              id="price"
              label="Price"
              type="number"
              fullWidth
              variant="outlined"
              value={product?.price || ' '}
              onChange={(e) => setProduct(prevProduct => prevProduct ? { ...prevProduct, price: Number(e.target.value) } : null)}
            />

            {/* Category Select Input */}
            <FormControl fullWidth sx={{ my: 1 }}>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={defaultCategory}
                label="Category"
                onChange={(e) => setProduct(prevProduct => prevProduct ? { ...prevProduct, category: e.target.value as string } : null)}
              >
                {categories.map(category => <MenuItem key={category} value={category}>{category}</MenuItem>)}
              </Select>
            </FormControl>

            {/* Product Description Input */}
            <TextField sx={{ my: 1 }}
              margin="dense"
              id="description"
              label="Description"
              type="text"
              fullWidth
              variant="outlined"
              value={product?.description || ' '}
              onChange={(e) => setProduct(prevProduct => prevProduct ? { ...prevProduct, description: e.target.value } : null)}
            />

            {/* Image Upload Button */}
            <ImageUploadButton onImageUpload={handleImageUpload} />
          </form>
        ) : (
          // Confirmation message for deleting a product
          <p>Are you sure you want to delete the product <strong>{product?.name}</strong>?</p>
        )}
      </DialogContent>
      <DialogActions>
        {/* Cancel and Confirm Buttons */}
        <Button onClick={onClose} variant='outlined'>Cancel</Button>
        <Button onClick={onConfirm} color="primary" variant="contained">
          {action === 'edit' ? 'Save Changes' : action === 'add' ? 'Add Product' : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
