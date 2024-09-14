import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, onClick }) => (
  <ListItemButton onClick={onClick} sx={{ mb: 1 }}>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={label} />
  </ListItemButton>
);

export default SidebarItem;
