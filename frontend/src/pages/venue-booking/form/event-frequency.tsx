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
  frequency: string;
  setRepeatFrequency: (value: string) => void;
  repeatInterval: number | '';
  repeatUntil: string | null;
  setRepeatUntil: (value: string | null) => void;
  selectedDay: string | null;
  setSelectedDay: (value: string | null) => void;
}

const EventFrequency: React.FC<EventFrequencyProps> = ({
  frequency,
  setRepeatFrequency,
  repeatUntil,
  setRepeatUntil,
  selectedDay,
  setSelectedDay,
}) => {
  return (
    <Box sx={{ marginBottom: 3 }}>
      <InputLabel shrink>Frequency</InputLabel>
      <RadioGroup
        row
        value={frequency}
        onChange={(e) => setRepeatFrequency(e.target.value)}
        name="frequency"
      >
        <FormControlLabel value="once" control={<Radio />} label="Only once" />
        <FormControlLabel value="every" control={<Radio />} label="Every" />
        {frequency === 'every' && (
          <>
            <Select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
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
      {frequency === 'every' && (
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
