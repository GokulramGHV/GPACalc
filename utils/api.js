const API_BASE_URL = 'https://gpacalc-backend.gokulramghv.repl.co/calcs/';

export const request = async (endpoint, method = 'GET', data = {}) => {
  let url;
  let payload;
  if (method === 'GET') {
    const requestParams = data
      ? `?${Object.keys(data)
          .map((key) => `${key}=${data[key]}`)
          .join('&')}`
      : '';
    url = `${API_BASE_URL}${endpoint}${requestParams}`;
    payload = '';
  } else {
    url = `${API_BASE_URL}${endpoint}`;
    payload = data ? JSON.stringify(data) : '';
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: method !== 'GET' ? payload : null,
  });

  if (response.ok) {
    const json = await response.json();
    return json;
  } else {
    const errorJson = await response.json();
    throw Error(errorJson);
  }
};

export const getCalcs = () => {
  return request('/', 'GET');
};

export const getCalc = (ID) => {
  return request(`/${ID}/`, 'GET');
};
