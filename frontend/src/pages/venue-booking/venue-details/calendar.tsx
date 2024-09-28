import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Box, Grid, IconButton, Typography, useTheme } from '@mui/material';
import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from 'date-fns';
import React, { useEffect, useState } from 'react';

interface CalendarProps {
  onDateSelect: (date: Date) => void;
  reservationsData: Record<string, any>;
}

const Calendar: React.FC<CalendarProps> = ({ onDateSelect, reservationsData }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const theme = useTheme();
  // Call onDateSelect when selectedDate changes
  useEffect(() => {
    onDateSelect(selectedDate);
  }, [selectedDate, onDateSelect]);

  const renderHeader = () => {
    const dateFormat = 'MMMM yyyy';

    return (
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <IconButton onClick={() => setCurrentDate(subMonths(currentDate, 1))}>
          <ChevronLeft />
        </IconButton>
        <Typography variant="h6">{format(currentDate, dateFormat)}</Typography>
        <IconButton onClick={() => setCurrentDate(addMonths(currentDate, 1))}>
          <ChevronRight />
        </IconButton>
      </Box>
    );
  };

  const renderDays = () => {
    const days = [];
    const dateFormat = 'eeee';
    const startDate = startOfWeek(currentDate);

    for (let i = 0; i < 7; i++) {
      days.push(
        <Grid item xs={1.71} key={i} justifyContent="center">
          <Typography variant="body2" align="center">
            {format(addDays(startDate, i), dateFormat).substring(0, 3)}
          </Typography>
        </Grid>,
      );
    }

    return <Grid container>{days}</Grid>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const formattedDate: string = format(day, 'yyyy-MM-dd');
        const isBooked = !!reservationsData[formattedDate];

        days.push(
          <Grid item xs={1.7} key={day.toISOString()} justifyContent="center">
            <Box
              onClick={() => {
                setSelectedDate(cloneDay);
                setCurrentDate(cloneDay);
              }}
              sx={{
                cursor: 'pointer',
                textAlign: 'center',
                padding: 1,
                width: '40px',
                height: '40px',
                backgroundColor: isSameMonth(day, monthStart)
                  ? isSameDay(day, selectedDate)
                    ? 'primary.main'
                    : isBooked
                      ? theme.palette.secondary.main
                      : theme.palette.background.default
                  : 'text.disabled',
                color: isSameDay(day, selectedDate) || isBooked ? 'white' : 'text.primary',
                borderRadius: '50%',
                margin: 'auto',
              }}
            >
              {format(day, 'd')}
            </Box>
          </Grid>,
        );
        day = addDays(day, 1);
      }
      rows.push(
        <Grid container justifyContent="center" key={day.toISOString()}>
          {days}
        </Grid>,
      );
      days = [];
    }

    return <Box>{rows}</Box>;
  };

  return (
    <Box>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </Box>
  );
};

export default Calendar;
