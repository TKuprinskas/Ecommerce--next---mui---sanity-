import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { Alert, CircularProgress, Grid } from '@mui/material';
import client from '@/utils/client';
import ProducItem from '@/components/ProducItem';

export default function Home() {
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
                            <ProducItem product={product} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Layout>
    );
}
