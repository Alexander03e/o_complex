const baseUrl = "http://o-complex.com:1337";
export const fetchData = async (request: string, method = 'GET') => {
  const response = await fetch(`${baseUrl}${request}`, {
    next: { revalidate: 20 },
  });
  if (!response.ok) {
    throw new Error("Error");
  }
  return await response.json();
};
