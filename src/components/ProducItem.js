import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Rating, Typography } from '@mui/material';
import NextLink from 'next/link';
import React from 'react';
import { urlForThumbnail } from '../utils/image';

export default function ProductItem({ product }) {
    return (
        <Card>
            <NextLink href={`/product/${product.slug.current}`} passHref>
                <CardActionArea>
                    <CardMedia component="img" image={urlForThumbnail(product.image)} title={product.name}></CardMedia>
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
                <Button size="small" color="primary">
                    Add to cart
                </Button>
            </CardActions>
        </Card>
    );
}
