import { ofetch } from 'ofetch';

const SHLINK_API_KEY = import.meta.env.VITE_SHLINK_API_KEY;

export const createShortUrl = async (longUrl, options = {}) => {
  return await ofetch('https://wsf-shlink.nook.sh/rest/v3/short-urls', {
    method: 'POST',
    headers: {
      'X-Api-Key': SHLINK_API_KEY,
      'Content-Type': 'application/json'
    },
    body: {
      longUrl,
      title: options.title || undefined,
      customSlug: options.customSlug || undefined,
      shortCodeLength: !options.customSlug ? options.slugLength : undefined
    }
  });
};
