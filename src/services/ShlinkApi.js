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

export async function getShortUrls(page = 1, itemsPerPage = 10) {
  const response = await fetch(`https://wsf-shlink.nook.sh/rest/v3/short-urls?page=${page}&itemsPerPage=${itemsPerPage}`, {
    headers: {
      'X-Api-Key': SHLINK_API_KEY,
    },
  });

  if (!response.ok) throw new Error('Erreur de chargement des liens');

  return response.json();
}

