const BASE_URL = 'http://localhost:5000';

function IsJSON(data) {
    try {
      JSON.parse(data);
    } catch (e) {
      return false;
    }
    return true;
}

export const request = async (params, method = 'GET', body) => {
  const token = localStorage.getItem('token');
  return fetch(`${BASE_URL}${params}`, {
    method,
    headers: {
      Token: token ? token : '',
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(body),
  })
    .then((response) => { return response.json() })
    .then((data) => { return data })
    .catch((error) => alert(`Seems like an error: ${error}`));
};
