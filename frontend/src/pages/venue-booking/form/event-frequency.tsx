import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from '@mui/material';
import React from 'react';

interface EventFrequencyProps {
  repeatOption: string;
  setRepeatOption: (value: string) => void;
  repeatUntil: string | null;
  setRepeatUntil: (value: string | null) => void;
  selectedFrequency: string | null;
  setSelectedFrequency: (value: string | null) => void;
  error: { repeatUntil?: string; selectedFrequency?: string };
}

const EventFrequency: React.FC<EventFrequencyProps> = ({
  repeatOption,
  setRepeatOption,
  repeatUntil,
  setRepeatUntil,
  selectedFrequency,
  setSelectedFrequency,
  error,
}) => {
  return (
    <Box sx={{ marginBottom: 3 }}>
      <InputLabel shrink>Frequency</InputLabel>
      <RadioGroup
        row
        value={repeatOption}
        onChange={(e) => setRepeatOption(e.target.value)}
        name="frequency"
      >
        <FormControlLabel value="once" control={<Radio />} label="Only once" />
        <FormControlLabel value="every" control={<Radio />} label="Repeat" />
        {repeatOption === 'every' && (
          <FormControl variant="outlined" sx={{ mx: 1, mt: 2 }} error={!!error.selectedFrequency}>
            <Select
              value={selectedFrequency}
              onChange={(e) => setSelectedFrequency(e.target.value)}
              variant="outlined"
              sx={{ height: '55px' }}
            >
              <MenuItem value="" disabled>
                Choose a Day
              </MenuItem>
              <MenuItem value="daily">Daily</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
            </Select>
            {error.selectedFrequency && <FormHelperText>{error.selectedFrequency}</FormHelperText>}
          </FormControl>
        )}
      </RadioGroup>
      {repeatOption === 'every' && (
        <Box sx={{ marginTop: 2 }}>
          <InputLabel shrink>Repeat until</InputLabel>
          <TextField
            name="repeatUntil"
            type="date"
            value={repeatUntil}
            onChange={(e) => setRepeatUntil(e.target.value)}
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!error.repeatUntil}
            helperText={error.repeatUntil || ''}
          />
        </Box>
      )}
    </Box>
  );
};

export default EventFrequency;
