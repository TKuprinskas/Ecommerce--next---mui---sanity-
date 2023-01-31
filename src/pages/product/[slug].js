import { useState, useEffect, useContext } from 'react';
import client from '@/utils/client';
import Layout from '@/components/Layout';
import {
    Alert,
    Box,
    Button,
    Card,
    CircularProgress,
    Grid,
    Link,
    List,
    ListItem,
    Rating,
    Typography,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import classes from '@/utils/classes';
import Image from 'next/image';
import { urlFor, urlForThumbnail } from '@/utils/image';
import NextLink from 'next/link';
import { Store } from '@/utils/Store';
import axios from 'axios';

export default function ProductScreen(props) {
    const { slug } = props;
    const {
        state: { cart },
        dispatch,
    } = useContext(Store);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [state, setState] = useState({
        product: null,
        loading: true,
        error: '',
    });
    const { loading, error, product } = state;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const product = await client.fetch(`*[_type == "product" && slug.current == $slug][0]`, { slug });
                setState({ ...state, product, loading: false });
            } catch (error) {
                setState({ ...state, error: error.message, loading: false });
            }
        };
        fetchData();
    }, []);

    const addToCartHandler = async () => {
        const existItem = cart.cartItems.find((x) => x._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/products/${product._id}`);
        if (data.countInStock < quantity) {
            enqueueSnackbar('Sorry. Product is out of stock', { variant: 'error' });
            return;
        }
        dispatch({
            type: 'CART_ADD_ITEM',
            payload: {
                _key: product._id,
                name: product.name,
                countInStock: product.countInStock,
                slug: product.slug,
                price: product.price,
                image: urlForThumbnail(product.image),
                quantity,
            },
        });
        enqueueSnackbar(`${product.name} added to cart`, { variant: 'success' });
    };

    return (
        <Layout title={product?.name}>
            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Alert variant="error">{error}</Alert>
            ) : (
                <Box>
                    <Box sx={classes.section}>
                        <Link component={NextLink} href="/" passHref>
                            <Typography>Back to results</Typography>
                        </Link>
                    </Box>
                    <Grid container spacing={1}>
                        <Grid item md={6} xs={12}>
                            <Image src={urlFor(product.image)} alt={product.name} width={480} height={480} />
                        </Grid>
                        <Grid item md={3} xs={12}>
                            <List>
                                <ListItem>
                                    <Typography component="h1" variant="h1">
                                        {product.name}
                                    </Typography>
                                </ListItem>
                                <ListItem>Category: {product.category}</ListItem>
                                <ListItem>Brand: {product.brand}</ListItem>
                                <ListItem>
                                    <Rating value={product.rating} readOnly />
                                    <Typography>({product.numReviews} reviews)</Typography>
                                </ListItem>
                                <ListItem sx={classes.description}>
                                    Description:{' '}
                                    {product.description &&
                                        product.description
                                            .split(';')
                                            .map((line, index) => <Typography key={index}>{line}</Typography>)}
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid item md={3} xs={12} sx={{ marginTop: 4 }}>
                            <Card>
                                <List>
                                    <ListItem>
                                        <Grid container>
                                            <Grid item xs={6}>
                                                <Typography>Price:</Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography>${product.price}</Typography>
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                    <ListItem>
                                        <Grid container>
                                            <Grid item xs={6}>
                                                <Typography>Status:</Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography>
                                                    {product.countInStock > 0 ? 'In Stock' : 'Unavailable'}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                    <ListItem>
                                        <Button fullWidth variant="contained" onClick={addToCartHandler}>
                                            Add to Cart
                                        </Button>
                                    </ListItem>
                                </List>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            )}
        </Layout>
    );
}

export function getServerSideProps(context) {
    return {
        props: { slug: context.params.slug },
    };
}
