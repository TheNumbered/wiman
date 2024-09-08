import SearchIcon from '@mui/icons-material/Search';
import { Box, InputAdornment, TextField } from '@mui/material';
import React from 'react';

const SearchBar: React.FC = () => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        p: 2,
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <TextField
        variant="outlined"
        placeholder="Search"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{
          width: { xs: '80%', md: '50%' },
          borderRadius: '20px', // This will make the corners rounded
          '& .MuiOutlinedInput-root': {
            borderRadius: '20px', // Ensure the input field itself is rounded
          },
        }}
      />
    </Box>
  );
};

export default SearchBar;
