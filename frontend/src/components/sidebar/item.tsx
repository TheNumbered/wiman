import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  selected: boolean; // Add selected prop
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, onClick, selected }) => (
  <ListItemButton
    onClick={onClick}
    selected={selected} // Apply selected state
    sx={{ mb: 1 }}
  >
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={label} />
  </ListItemButton>
);

export default SidebarItem;
