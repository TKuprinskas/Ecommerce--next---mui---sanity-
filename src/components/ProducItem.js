import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Rating, Typography } from '@mui/material';
import NextLink from 'next/link';
import React from 'react';
import { urlForThumbnail } from '../utils/image';

export default function ProductItem({ product, addToCartHandler }) {
    return (
        <Card>
            <NextLink href={`/product/${product.slug.current}`} passHref>
                <CardActionArea>
                    <CardMedia
                        sx={{ marginTop: 1 }}
                        component="img"
                        image={urlForThumbnail(product.image)}
                        title={product.name}
                    ></CardMedia>
                    <CardContent>
                        <Typography>{product.name}</Typography>
                        <Typography>
                            <Rating value={product.rating} readOnly />
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </NextLink>
            <CardActions sx={{ marginLeft: 1 }}>
                <Typography>${product.price}</Typography>
                <Button size="small" color="primary" onClick={() => addToCartHandler(product)}>
                    Add to cart
                </Button>
            </CardActions>
        </Card>
    );
}
