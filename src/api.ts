const BASE_URL = "http://localhost:3000/api";

interface RequestOptions {
  endpoint: string;
  body: any;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
};

export interface ApiError extends Error {
  message: string;
}

export const api = async ({ endpoint, body, method }: RequestOptions) => {
  const URL = `${BASE_URL}${endpoint}`;

  const response = await fetch(URL, {
      method,
      body: JSON.stringify(body)
    }
  );

  if(!response.ok) {
    const { message } = await response.json();
    throw new Error(message);
  }

  const result = await response.json();
  return result;
};