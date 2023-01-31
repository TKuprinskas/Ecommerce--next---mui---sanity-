import { createTheme } from '@mui/material/styles';
import {
    AppBar,
    Badge,
    Box,
    Container,
    CssBaseline,
    Link,
    Switch,
    ThemeProvider,
    Toolbar,
    Typography,
} from '@mui/material';
import Head from 'next/head';
import NextLink from 'next/link';
import classes from '../utils/classes';
import { useContext } from 'react';
import { Store } from '../utils/Store';
import jsCookie from 'js-cookie';

export default function Layout({ title, description, children }) {
    const { state, dispatch } = useContext(Store);
    const { darkMode, cart } = state;
    const theme = createTheme({
        components: {
            MuiLink: {
                defaultProps: {
                    underline: 'hover',
                },
            },
        },
        typography: {
            h1: {
                fontSize: '1.6rem',
                fontWeight: 400,
                margin: '1rem 0',
            },
            h2: {
                fontSize: '1.4rem',
                fontWeight: 400,
                margin: '1rem 0',
            },
        },
        palette: {
            mode: darkMode ? 'dark' : 'light',
            primary: {
                main: '#f0c000',
            },
            secondary: {
                main: '#208080',
            },
        },
    });
    const darkModeChangeHandler = () => {
        dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON' });
        const newDarkMode = !darkMode;
        jsCookie.set('darkMode', newDarkMode ? 'ON' : 'OFF');
    };
    return (
        <>
            <Head>
                <title>{title ? `${title} - Mediniai Bruseliai` : 'Mediniai Bruseliai'}</title>
                {description && <meta name="description" content={description}></meta>}
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppBar position="static" sx={classes.appbar}>
                    <Toolbar sx={classes.toolbar}>
                        <Box display="flex" alignItems="center">
                            <Link component={NextLink} href="/" passHref>
                                <Typography sx={classes.brand}>Bruselija</Typography>
                            </Link>
                        </Box>
                        <Box>
                            <Switch checked={darkMode} onChange={darkModeChangeHandler}></Switch>
                            <Link component={NextLink} href="/cart" passHref>
                                <Typography component="span">
                                    {cart.cartItems.length > 0 ? (
                                        <Badge color="secondary" badgeContent={cart.cartItems.length}>
                                            Cart{' '}
                                        </Badge>
                                    ) : (
                                        'Cart'
                                    )}
                                </Typography>
                            </Link>
                        </Box>
                    </Toolbar>
                </AppBar>
                <Container component="main" sx={classes.main}>
                    {children}
                </Container>
                <Box component="footer" sx={classes.footer}>
                    <Typography variant="body2" align="center">
                        {'© '}
                        <Link component={NextLink} href="/" passHref>
                            Bruselija
                        </Link>{' '}
                        {new Date().getFullYear()}
                        {'.'}
                    </Typography>
                </Box>
            </ThemeProvider>
        </>
    );
}
