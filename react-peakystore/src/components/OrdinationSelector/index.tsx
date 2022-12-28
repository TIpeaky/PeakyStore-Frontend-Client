import { useState } from 'react';

// MUI Material
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const OrdinationSelector = ({ onAddOption }: any) => {
  const [option, setOption] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setOption(event.target.value as string);

    onAddOption(event.target.value as string);

    console.log(option);
  };

  return (
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Ordenação</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={option}
          label="Ordenacao"
          onChange={handleChange}
        >
          <MenuItem value={"salePrice,asc"}>Preço Crescente</MenuItem>
          <MenuItem value={"salePrice,desc"}>Preço Decrescente</MenuItem>
          <MenuItem value={"name,asc"}>A - Z</MenuItem>
          <MenuItem value={"name,desc"}>Z - A</MenuItem>
        </Select>
      </FormControl>
  );
}

export default OrdinationSelector;