const API_URL = process.env.EXPO_PUBLIC_API_URL;

// Function to fetch the list of products from the API
export async function listProducts() {
  const res = await fetch(`${API_URL}/products`);
  const data = await res.json();

  // Check if the response is ok (status code 200-299)
  if (!res.ok) {
    throw new Error(data.message || "Error fetching products");
  }
  return data;
}

// Function to fetch a single product by ID from the API
export async function fetchProductById(id: number) {
  const res = await fetch(`${API_URL}/products/${id}`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Error fetching product");
  }
  return data;
}
