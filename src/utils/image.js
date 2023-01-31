import ImageUrlBuilder from '@sanity/image-url';
import client from './client';

function urlForThumbnail(source) {
    return ImageUrlBuilder(client).image(source).width(300).url();
}

function urlFor(source) {
    return ImageUrlBuilder(client).image(source).width(480).url();
}

export { urlFor, urlForThumbnail };
