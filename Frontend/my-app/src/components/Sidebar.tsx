// src/components/Sidebar.tsx
import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  Typography,
  Divider,
  useTheme,
} from '@mui/material';
import {
  Home,
  CalendarToday,
  School,
  Group,
  Person,
  AssignmentTurnedIn,
  People,
  MenuBook,
  AccessTime,
  BarChart,
  AccountCircle,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

interface NavItem {
  name: string;
  icon: React.ReactNode;
  path: string;
}

const navItems: NavItem[] = [
  { name: 'Home', icon: <Home />, path: '/' },
  { name: 'Calendar', icon: <CalendarToday />, path: '/calendar' },
  { name: 'Classes', icon: <School />, path: '/classes' },
  { name: 'Students', icon: <Group />, path: '/students' },
  { name: 'Professors', icon: <Person />, path: '/professors' },
  { name: 'Attendance', icon: <AssignmentTurnedIn />, path: '/attendance' },
  { name: 'Grading', icon: <People />, path: '/grading' },
  { name: 'Admissions', icon: <MenuBook />, path: '/admissions' },
  { name: 'Curriculum', icon: <AccessTime />, path: '/curriculum' },
  { name: 'College Periods', icon: <BarChart />, path: '/periods' },
  { name: 'Reports', icon: <BarChart />, path: '/reports' },
];

const accountItem: NavItem = {
  name: 'Account',
  icon: <AccountCircle />,
  path: '/account',
};

interface SidebarProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, handleDrawerToggle }) => {
  const theme = useTheme();

  return (
    <Box component="nav">
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, fontSize: '20px' },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" fontWeight="bold">
            My College
          </Typography>
        </Toolbar>
        <Divider />
        <List sx={{ fontSize: '60px' }}>
          {navItems.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton component={Link} to={item.path}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText sx={{ fontSize: '60px', fontWeight: 500 }} primary={item.name}  />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to={accountItem.path}>
              <ListItemIcon>{accountItem.icon}</ListItemIcon>
              <ListItemText primary={accountItem.name}  />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      {/* Desktop Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            backgroundColor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#f9f9f9',
            borderRight: 'none',
            boxShadow: 2,
          },
        }}
        open
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" fontWeight="bold">
            🏫 My College
          </Typography>
        </Toolbar>
        <Divider />
        <List sx={{ flexGrow: 1 }}>
          {navItems.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton component={Link} to={item.path}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to={accountItem.path}>
              <ListItemIcon>{accountItem.icon}</ListItemIcon>
              <ListItemText primary={accountItem.name} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;