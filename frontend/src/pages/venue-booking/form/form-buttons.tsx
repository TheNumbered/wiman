import { Box, Button, CircularProgress } from '@mui/material';
import React from 'react';

interface FormButtonsProps {
  handleSubmit: (event: any) => Promise<void>;
  isSubmitting: boolean;
}

const FormButtons: React.FC<FormButtonsProps> = ({ handleSubmit, isSubmitting }) => {
  return (
    <Box display="flex" justifyContent="space-between">
      <Button variant="outlined" disabled={isSubmitting}>
        Cancel
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleSubmit}
        disabled={isSubmitting}
        startIcon={isSubmitting && <CircularProgress size={20} />}
      >
        {isSubmitting ? 'Booking...' : 'Book'}
      </Button>
    </Box>
  );
};

export default FormButtons;
