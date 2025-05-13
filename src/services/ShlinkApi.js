import { ofetch } from 'ofetch';

const BASE_URL = import.meta.env.VITE_SHLINK_BASE_URL;
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



export const getShortUrlVisits = async (shortCode, params = {}) => {
  return await ofetch(`${BASE_URL}/short-urls/${shortCode}/visits`, {
    method: 'GET',
    headers: { 'X-Api-Key': SHLINK_API_KEY },
    params: {
      page: params.page || 1,
      itemsPerPage: params.itemsPerPage || 100,
    }
  })
}
