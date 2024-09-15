import {
  Box,
  FormControlLabel,
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
}

const EventFrequency: React.FC<EventFrequencyProps> = ({
  repeatOption,
  setRepeatOption,
  repeatUntil,
  setRepeatUntil,
  selectedFrequency,
  setSelectedFrequency,
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
        <FormControlLabel value="every" control={<Radio />} label="Every" />
        {repeatOption === 'every' && (
          <>
            <Select
              value={selectedFrequency}
              onChange={(e) => setSelectedFrequency(e.target.value)}
              variant="outlined"
              sx={{ width: '150px', mx: 1, height: '55px', mt: 2 }}
            >
              <MenuItem value="" disabled>
                Choose a Day
              </MenuItem>
              <MenuItem value="daily">Day</MenuItem>
              <MenuItem value="weekly">Week</MenuItem>
              <MenuItem value="monthly">Month</MenuItem>
            </Select>
          </>
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
          />
        </Box>
      )}
    </Box>
  );
};

export default EventFrequency;
