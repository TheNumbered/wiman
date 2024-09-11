import { Button, Input } from '@mui/material';
import React from 'react';

interface ImageUploadButtonProps {
  onImageSelect: (file: File | null) => void;
}

const ImageUploadButton: React.FC<ImageUploadButtonProps> = ({ onImageSelect }) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onImageSelect(event.target.files[0]);
    } else {
      onImageSelect(null);
    }
  };

  return (
    <div>
      <Input
        id="upload-button"
        type="file"
        inputProps={{
          accept: 'image/*',
        }}
        style={{ display: 'none' }}
        onChange={handleImageChange}
      />
      <label htmlFor="upload-button">
        <Button variant="outlined" component="span">
          Upload Image
        </Button>
      </label>
    </div>
  );
};

export default ImageUploadButton;
