import {
  AssessmentOutlined,
  BookmarksOutlined,
  DarkModeOutlined,
  DeleteOutline,
  EventAvailableOutlined,
  FastForwardOutlined,
  GroupOutlined,
  HomeOutlined,
  KeyboardReturnOutlined,
  NotificationsOutlined,
  PanTool,
} from '@mui/icons-material';

export const userMenuItems = [
  { label: 'Home', icon: <HomeOutlined />, route: '/dashboard' },
  { label: 'Bookings', icon: <BookmarksOutlined />, route: '/bookings' },
  {
    label: 'Activity',
    icon: <NotificationsOutlined />,
    route: '/activity',
  },
];

export const adminMenuItems = [
  { label: 'Home', icon: <HomeOutlined />, route: '/dashboard' },
  { label: 'Manage Users', icon: <GroupOutlined />, route: '/admin/manage-users' },
  { label: 'Role Change', icon: <AssessmentOutlined />, route: '/admin/role-change' },
  { label: 'Manage Bookings', icon: <EventAvailableOutlined />, route: '/admin/manage-bookings' },
];

export const maintenanceMenuItems = [
  { label: 'Home', icon: <HomeOutlined />, route: '/dashboard' },
  { label: 'Issues', icon: <PanTool />, route: '/maintenance/issues' },
];
export const adminSecondaryMenuItems = [
  {
    label: 'Dark Mode',
    icon: <DarkModeOutlined />,
  },
  {
    label: 'Log Out',
    icon: <KeyboardReturnOutlined />,
  },
];

export const profileMenuItems = [
  {
    label: 'Dark Mode',
    icon: <DarkModeOutlined />,
  },
  {
    label: 'Clear History',
    icon: <DeleteOutline />,
  },
  {
    label: 'Other Wits Apps',
    icon: <FastForwardOutlined />,
  },
  {
    label: 'Log Out',
    icon: <KeyboardReturnOutlined />,
  },
];
