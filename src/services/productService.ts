import { api } from "@/lib/utils/api";
import {
  Product,
  ProductListResponse,
  CreateProductRequest,
  UpdateProductRequest,
  Category,
} from "@/types/product";

export const productService = {
  // Get all products with pagination
  async getProducts(
    limit: number = 10,
    skip: number = 0
  ): Promise<ProductListResponse> {
    const response = await api.get(`/products?limit=${limit}&skip=${skip}`);
    return response.data;
  },

  // Get single product by ID
  async getProductById(id: number): Promise<Product> {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  // Search products
  async searchProducts(
    query: string,
    limit: number = 10,
    skip: number = 0
  ): Promise<ProductListResponse> {
    const response = await api.get(
      `/products/search?q=${query}&limit=${limit}&skip=${skip}`
    );
    return response.data;
  },

  // Create new product
  async createProduct(productData: CreateProductRequest): Promise<Product> {
    const response = await api.post("/products/add", productData);
    return response.data;
  },

  // Update product
  async updateProduct(
    id: number,
    productData: UpdateProductRequest
  ): Promise<Product> {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },

  // Delete product
  async deleteProduct(id: number): Promise<void> {
    await api.delete(`/products/${id}`);
  },

  // Get categories

  async getCategories(): Promise<Category[]> {
    const response = await api.get(`/products/categories`);
    return response.data;
  },

  // Get products by category
  async getProductsByCategory(
    category: string,
    limit: number = 10,
    skip: number = 0
  ): Promise<ProductListResponse> {
    const response = await api.get(
      `/products/category/${category}?limit=${limit}&skip=${skip}`
    );
    return response.data;
  },
};
