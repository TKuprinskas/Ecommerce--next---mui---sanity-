import '@/styles/globals.css';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

const clientSideEmotionCache = createCache({ key: 'css' });

function MyApp({ Component, pageProps, emotionCache = clientSideEmotionCache }) {
    return (
        <CacheProvider value={emotionCache}>
            <Component {...pageProps} emotionCache={emotionCache} />
        </CacheProvider>
    );
}

export default MyApp;
