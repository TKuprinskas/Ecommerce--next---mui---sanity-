import React, { useEffect, useState, useContext } from 'react';
import Layout from '@/components/Layout';
import { Alert, CircularProgress, Grid } from '@mui/material';
import client from '@/utils/client';
import ProducItem from '@/components/ProducItem';
import { Store } from '@/utils/Store';
import axios from 'axios';
import { urlForThumbnail } from '@/utils/image';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';

export default function Home() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const router = useRouter();
    const {
        state: { cart },
        dispatch,
    } = useContext(Store);
    const [state, setState] = useState({
        products: [],
        loading: true,
        error: '',
    });
    const { loading, error, products } = state;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const products = await client.fetch(`*[_type == "product"]`);
                setState({ products, loading: false });
            } catch (error) {
                setState({ error: error.message, loading: false });
            }
        };
        fetchData();
    }, []);

    const addToCartHandler = async (product) => {
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
        <Layout title="Home" description="Mediniai bruseliai">
            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Alert variant="danger">{error}</Alert>
            ) : (
                <Grid container spacing={3}>
                    {products.map((product) => (
                        <Grid item xs={12} sm={6} md={2} key={product._id}>
                            <ProducItem product={product} addToCartHandler={addToCartHandler} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Layout>
    );
}
