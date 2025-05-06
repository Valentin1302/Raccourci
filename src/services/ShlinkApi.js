import { ofetch } from 'ofetch';

export const createShortUrl = async (longUrl, options = {}) => {
  return await ofetch('https://wsf-shlink.nook.sh/rest/v3/short-urls', {
    method: 'POST',
    headers: {
      'X-Api-Key': '26236e25-3ab8-4972-b7d5-e1095f8790d0',
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
