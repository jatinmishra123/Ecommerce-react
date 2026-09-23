const API_URL = import.meta.env.VITE_API_URL || "https://jatinmishra.onrender.com";

async function request(path, options) {
  const response = await fetch(API_URL + path, options);
  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Something went wrong.");
  }

  return result.data;
}

// Adapts the admin panel's product shape to what this storefront's UI expects.
// Fields the backend doesn't have (rating, sizes, oldPrice) are left undefined;
// the UI already renders those conditionally, so they're skipped gracefully.
function mapProduct(product) {
  return {
    id: product._id,
    name: product.name,
    price: Number(product.price) || 0,
    img: imageUrl(product.image),
    description: product.text || "",
    category: (product.categoryName || "").toLowerCase(),
    categoryLabel: product.categoryName,
    subcategory: product.subcategoryName,
    badge: product.type === "new-arrival" ? "NEW" : undefined
  };
}

export async function getProducts() {
  const products = await request("/api/products");
  return products.map(mapProduct);
}

export async function getProductById(id) {
  const products = await getProducts();
  return products.find((p) => p.id === id) || null;
}

export function getCategories() {
  return request("/api/categories");
}

export function getSubcategories() {
  return request("/api/subcategories");
}

export async function getTestimonials() {
  const testimonials = await request("/api/testimonials");
  return testimonials.map((t) => ({
    id: t._id,
    name: t.customerName,
    role: "Verified Buyer",
    rating: Number(t.rating) || 5,
    text: t.reviewText
  }));
}

export function getBanners() {
  return request("/api/banners");
}

export function placeOrder(order) {
  return request("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order)
  });
}

export function imageUrl(path) {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return API_URL + path;
}
