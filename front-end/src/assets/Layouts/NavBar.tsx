import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function SildeNavBar() {
    const theme = useTheme();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [cookies, , removeCookie] = useCookies(['token', 'role']);

    const isAuthenticated = Boolean(cookies.token); // Check if the token exists
    const role = cookies.role || ''; // Get the user role

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleSignOut = () => {
        removeCookie('token', { path: '/' }); // Remove the token cookie
        removeCookie('role', { path: '/' }); // Remove the role cookie
        navigate('/signin'); // Redirect to sign-in page
    };

    const MainIcons = [
        <HomeIcon color='primary' />,
        <AdminPanelSettingsIcon color='primary' />,
        <ShoppingCartIcon color='primary' />
    ];

    const AuthIcons = [
        <HowToRegIcon color='primary' />,
        <LoginIcon color='primary' />,
        <LogoutIcon color='primary' />
    ];

    const menuItems = [
        { text: 'Home', icon: MainIcons[0], path: '/home', visible: true },
        { text: 'Dashboard', icon: MainIcons[1], path: '/dashboard', visible: role === 'admin' },
        { text: 'Cart', icon: MainIcons[2], path: '/cart', visible: isAuthenticated && role !== 'user' }
    ];

    const authItems = isAuthenticated ? [
        { text: 'Sign-Out', icon: AuthIcons[2], action: handleSignOut }
    ] : [
        { text: 'Sign-in', icon: AuthIcons[1], path: '/signin', action: () => navigate('/signin') },
        { text: 'Sign-up', icon: AuthIcons[0], path: '/signup', action: () => navigate('/signup') }
    ];

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Bamptee
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {menuItems.map(({ text, icon, path, visible }) => (
                        visible && (
                            <ListItem key={text} disablePadding>
                                <ListItemButton onClick={() => navigate(path)}>
                                    <ListItemIcon>
                                        {icon}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        )
                    ))}
                </List>
                <Divider />
                <List>
                    {authItems.map(({ text, icon, action }) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton onClick={action}>
                                <ListItemIcon>
                                    {icon}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </Box>
    );
}
