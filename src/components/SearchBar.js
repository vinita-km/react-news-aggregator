// SearchBar.js
import React from 'react';
import { TextField } from '@mui/material';

const SearchBar = ({ onChange }) => {
    return (
      <TextField label="Search articles" fullWidth onChange={onChange} style={{ marginBottom: '20px' }} />
    );
  };

export default SearchBar;
