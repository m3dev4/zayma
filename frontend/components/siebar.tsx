import * as React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SlowMotionVideoIcon from '@mui/icons-material/SlowMotionVideo';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import InventoryIcon from '@mui/icons-material/Inventory';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import authApiStore from '@/api/zustand/authApi';
import { useRouter } from 'next/navigation';
import StorefrontIcon from '@mui/icons-material/Storefront';

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Navigation',
  },
  {
    segment: '',
    title: 'Accueil',
    icon: <HomeIcon />,
  },
  {
    segment: 'pages/products',
    title: 'Produits',
    icon: <InventoryIcon />,
  },
  {
    segment: 'favories',
    title: 'Favories',
    icon: <FavoriteIcon />,
  },
  {
    segment: 'commandes',
    title: 'Commandes',
    icon: <ShoppingCartIcon />,
  },
  {
    segment: 'conversation',
    title: 'Conversation',
    icon: <QuestionAnswerIcon />,
  },
  {
    segment: 'zeyTok',
    title: 'ZeyTok',
    icon: <SlowMotionVideoIcon />,
  },
  {
    segment: 'pages/createStore',
    title: 'Créer une boutique',
    icon: <StorefrontIcon />,
  },
];

export default function DashboardLayoutAccountSidebar() {
  const { logout, user } = authApiStore();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await logout();
    handleClose();
    router.push('/');
  };

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        title: 'ZAYMA',
      }}
    >
      <DashboardLayout
        slots={{
          sidebarFooter: () => (
            <Box sx={{ p: 0 }}>
              <MenuItem
                onClick={handleClick}
                className="flex items-center justify-center"
              >
                <ListItemIcon>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemIcon>
                <ListItemText
                  primary={user?.email}
                  secondary={
                    user?.firstName
                      ? `${user.firstName} ${user.lastName}`
                      : 'Mon profil'
                  }
                  sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
                />
              </MenuItem>

              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={() => (window.location.href = '/profile')}>
                  <ListItemIcon>
                    <PersonIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Profile</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Se déconnecter</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          ),
        }}
        sx={{
          '& .MuiDrawer-paper': {
            overflow: 'hidden',
          },
        }}
      ></DashboardLayout>
    </AppProvider>
  );
}
