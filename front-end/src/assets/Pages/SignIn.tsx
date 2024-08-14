import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

// Define the structure of user data and response types
interface User {
    email: string;
    token: string;
}

interface SignInResponseData {
    user: User;
}

interface SignInResponse {
    status: string;
    message: string;
    data: SignInResponseData;
}

// Create a default theme for the application
const defaultTheme = createTheme();

export default function SignIn() {
    const [, setCookie] = useCookies(['token']);
    const navigate = useNavigate();

    // State for Snackbar visibility and message
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

    // Handle user authentication
    const authenticateUser = async (email: string, password: string): Promise<void> => {
        try {
            const response = await axios.post<SignInResponse>('http://127.0.0.1:8000/user/login', {
                email,
                password,
            });

            // Extract the token and set it in cookies
            const token = response.data.data.user.token;
            setCookie('token', token, { path: '/' });
            
            // Show success message and navigate after a delay
            setSnackbarMessage('Login successful!');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            
            // Wait for the Snackbar to be visible
            setTimeout(() => {
                navigate('/home');
            }, 3000); // Adjust the delay (3000 ms = 3 seconds) as needed

        } catch (error) {
            console.error('Authentication failed', error);
            setSnackbarMessage('Authentication failed');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    // Handle form submission
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email') as string;
        const password = data.get('password') as string;
        authenticateUser(email, password);
    };

    // Handle Snackbar close
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        {/* Email input field */}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        {/* Password input field */}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        {/* Submit button */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                {/* Link to sign up page */}
                                <Link href="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>

            {/* Snackbar for feedback */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </ThemeProvider>
    );
}
