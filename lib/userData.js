import { getToken } from "./authenticate";

export async function addToShoppingCart(id) {
  const result = await fetch(`https://fakestoreapi.com/products/${id}`);
  const data = await result.json();
  return data;
}

async function fetchData(url, method, data) {
  let token = getToken();

  let headers = {
    "content-type": "application/json",
    Authorization: `JWT ${token}`, // Fix: Use backticks and ${} to concatenate the token
  };

  let options = {
    method,
    headers,
    body: JSON.stringify(data),
  };

  const res = await fetch(url, options);
  if (res.status === 200) {
    return await res.json();
  } else {
    return [];
  }
}
