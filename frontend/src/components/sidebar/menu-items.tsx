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

export const adminSecondaryMenuItems = [
  {
    label: 'Dark Mode',
    icon: <DarkModeOutlined />,
    onClick: () => {
      console.log('Dark Mode');
    },
  },
  {
    label: 'Log Out',
    icon: <KeyboardReturnOutlined />,
    onClick: () => {
      console.log('Log Out');
    },
  },
];

export const profileMenuItems = [
  {
    label: 'Dark Mode',
    icon: <DarkModeOutlined />,
    onClick: () => {
      console.log('Dark Mode');
    },
  },
  {
    label: 'Clear History',
    icon: <DeleteOutline />,
    onClick: () => {
      console.log('Clear History');
    },
  },
  {
    label: 'Other Wits Apps',
    icon: <FastForwardOutlined />,
    onClick: () => {
      console.log('Other Wits Apps');
    },
  },
  {
    label: 'Log Out',
    icon: <KeyboardReturnOutlined />,
    onClick: () => {
      console.log('Log Out');
    },
  },
];
