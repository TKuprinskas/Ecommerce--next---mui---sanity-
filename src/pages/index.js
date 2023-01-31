import { Typography } from '@mui/material';
import Head from 'next/head';

export default function Home() {
    return (
        <>
            <Head>
                <title>Mediniai bruseliai</title>
                <meta name="description" content="Mediniu taseliu / bruseliu e.parduotuve" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Typography component="h1" variant="h1">
                Mediniai bruseliai / tašeliai
            </Typography>
        </>
    );
}
