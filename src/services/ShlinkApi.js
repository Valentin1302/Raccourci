import { ofetch } from 'ofetch';

const BASE_URL = import.meta.env.VITE_SHLINK_BASE_URL;
const SHLINK_API_KEY = import.meta.env.VITE_SHLINK_API_KEY;


function withApiKey(headers = {}) {
  return {
    'X-Api-Key': SHLINK_API_KEY,
    ...headers,
  };
}

export const createShortUrl = async (longUrl, options = {}) => {
  const url = `${BASE_URL}/rest/v3/short-urls`;

  const body = {
    longUrl,
  };

  if (options.title) body.title = options.title;
  if (options.customSlug) body.customSlug = options.customSlug;
  else if (options.slugLength) body.shortCodeLength = options.slugLength;
  if (options.tags) body.tags = options.tags;

  try {
    return await ofetch(url, {
      method: 'POST',
      headers: withApiKey({ 'Content-Type': 'application/json' }),
      body,
    });
  } catch (error) {
    throw new Error(`Erreur création short URL : ${error.data ? JSON.stringify(error.data) : error.message}`);
  }
};

export async function getShortUrls(page = 1, itemsPerPage = 10) {
  const url = `${BASE_URL}/rest/v3/short-urls`;
  try {
    return await ofetch(url, {
      method: 'GET',
      headers: withApiKey(),
      query: { page, itemsPerPage },
    });
  } catch (error) {
    throw new Error(`Erreur récupération short URLs : ${error.data ? JSON.stringify(error.data) : error.message}`);
  }
}

export const getShortUrlVisits = async (shortCode, params = {}) => {
  const url = `${BASE_URL}/rest/v3/short-urls/${shortCode}/visits`;
  try {
    return await ofetch(url, {
      method: 'GET',
      headers: withApiKey(),
      query: {
        page: params.page || 1,
        itemsPerPage: params.itemsPerPage || 100,
      },
    });
  } catch (error) {
    throw new Error(`Erreur récupération visites : ${error.data ? JSON.stringify(error.data) : error.message}`);
  }
};

export const deleteShortUrl = async (shortCode) => {
  const url = `${BASE_URL}/rest/v3/short-urls/${shortCode}`;
  try {
    return await ofetch(url, {
      method: 'DELETE',
      headers: withApiKey(),
    });
  } catch (error) {
    throw new Error(`Erreur suppression short URL : ${error.data ? JSON.stringify(error.data) : error.message}`);
  }
};

export const updateShortUrl = async (shortCode, data) => {
  const url = `${BASE_URL}/rest/v3/short-urls/${shortCode}`;
  const body = {};
  if (data.longUrl) body.longUrl = data.longUrl;
  if (data.title) body.title = data.title;

  try {
    return await ofetch(url, {
      method: 'PATCH',
      headers: withApiKey({ 'Content-Type': 'application/json' }),
      body,
    });
  } catch (error) {
    throw new Error(`Erreur mise à jour short URL : ${error.data ? JSON.stringify(error.data) : error.message}`);
  }
};

export async function getTags(page = 1, itemsPerPage = 50) {
  const url = `${BASE_URL}/rest/v3/tags`;
  try {
    return await ofetch(url, {
      method: 'GET',
      headers: withApiKey(),
      query: { page, itemsPerPage },
    });
  } catch (error) {
    throw new Error(`Erreur récupération tags : ${error.data ? JSON.stringify(error.data) : error.message}`);
  }
}

export const updateShortUrlTags = async (shortCode, tags) => {
  const url = `${BASE_URL}/rest/v3/short-urls/${shortCode}`;
  try {
    return await ofetch(url, {
      method: 'PATCH',
      headers: withApiKey({ 'Content-Type': 'application/json' }),
      body: { tags },
    });
  } catch (error) {
    throw new Error(`Erreur mise à jour tags short URL : ${error.data ? JSON.stringify(error.data) : error.message}`);
  }
};
