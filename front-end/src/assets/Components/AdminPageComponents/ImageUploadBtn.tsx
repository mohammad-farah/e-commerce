// ImageUploadButton.tsx

import React from 'react';
import { Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


interface ImageUploadButtonProps {
  onImageUpload: (base64Image: string) => void;
}

export const ImageUploadButton: React.FC<ImageUploadButtonProps> = ({ onImageUpload }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageUpload(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Button sx={{ my : 2}}
      variant="contained"
      component="label"
      startIcon={<CloudUploadIcon/>}
    >
      Upload Image
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        hidden
      />
    </Button>
  );
};


