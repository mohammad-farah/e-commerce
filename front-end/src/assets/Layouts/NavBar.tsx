import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import LoginIcon from '@mui/icons-material/Login';
import AdminPanelSettingsSharpIcon from '@mui/icons-material/AdminPanelSettingsSharp';
import ShoppingCartSharpIcon from '@mui/icons-material/ShoppingCartSharp';
import  Stack  from '@mui/material/Stack';

export default function NavBar() {
    return (

        <Box sx={{ flexGrow: 1 }}>

            <AppBar position="static">

                <Toolbar>

                    {/* <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >

                        <MenuIcon />

                    </IconButton> */}

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Bamptee
                    </Typography>

                    <Stack spacing={3} direction='row'>
                        {/* admin panel page */}
                        <Button color="inherit" startIcon={<AdminPanelSettingsSharpIcon />}>Admin Panel</Button>
                        
                        {/* Cart Page  */}
                        <Button color="inherit" startIcon={<ShoppingCartSharpIcon />} >Cart</Button>

                        {/* Authentication Components  */}
                        <Button color="inherit" >Login</Button>
                        <Button color="inherit">Sign-Up</Button>
                    </Stack>


                </Toolbar>

            </AppBar>

        </Box>
    );
}
