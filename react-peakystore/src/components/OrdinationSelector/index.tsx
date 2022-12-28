import { useState } from 'react';

// MUI Material
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Label } from '@mui/icons-material';

interface select {
  title: string,
  value: string
}

interface props {
  selectorName: string,
  optionList: Array<select>,
  label: string,
  onAddOption: any
}

const OrdinationSelector = ({selectorName, optionList, label, onAddOption}: props) => {
  const [option, setOption] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setOption(event.target.value as string);

    onAddOption(event.target.value as string);

    console.log("Lista de opções: " + optionList)

    console.log("SelectorName: " + selectorName)
  };

  return (
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{selectorName}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={option}
          label={label}
          onChange={handleChange}
        >
          {optionList?.map((obj, position) => (
            <MenuItem value={obj.value} key={position}>{obj.title}</MenuItem>
          ))}
        </Select>
      </FormControl>
  );
}

export default OrdinationSelector;