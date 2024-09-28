import { Button, Input } from '@mui/material';
import React from 'react';

interface ImageUploadButtonProps {
  onImageSelect: (files: FileList | null) => void;
}

const ImageUploadButton: React.FC<ImageUploadButtonProps> = ({ onImageSelect }) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      onImageSelect(event.target.files); // Pass the FileList to the parent component
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
          multiple: true, // Allow multiple image selection
        }}
        style={{ display: 'none' }}
        onChange={handleImageChange}
      />
      <label htmlFor="upload-button">
        <Button variant="outlined" component="span">
          Upload Images
        </Button>
      </label>
    </div>
  );
};

export default ImageUploadButton;
