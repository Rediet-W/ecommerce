"use client";
import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductList } from "@/components/products/ProductList";
import { SearchForm } from "@/components/forms/SearchForm";
import { useProducts } from "@/hooks/useProducts";
import { useDebounce } from "@/hooks/useDebounce";
import { productService } from "@/services/productService";
import { Product } from "@/types/product";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [skip, setSkip] = useState(0);
  const limit = 12;

  const debouncedSearch = useDebounce(searchQuery, 300);

  // Load initial products or search results
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        let response;
        if (debouncedSearch) {
          response = await productService.searchProducts(
            debouncedSearch,
            limit,
            0
          );
        } else {
          response = await productService.getProducts(limit, 0);
        }
        setAllProducts(response.products);
        setSkip(response.products.length);
        setHasMore(response.products.length === limit);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [debouncedSearch]);

  const loadMore = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      let response;
      if (debouncedSearch) {
        response = await productService.searchProducts(
          debouncedSearch,
          limit,
          skip
        );
      } else {
        response = await productService.getProducts(limit, skip);
      }

      setAllProducts((prev) => [...prev, ...response.products]);
      setSkip((prev) => prev + response.products.length);
      setHasMore(response.products.length === limit);
    } catch (error) {
      console.error("Failed to load more products:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <Header />

      {/* Add padding-top to account for fixed header */}
      <main className="flex-1 container mx-auto px-4 py-8 pt-24">
        {" "}
        {/* Changed pt-8 to pt-24 */}
        <div className="max-w-2xl mx-auto mb-8">
          <SearchForm
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search products..."
          />
        </div>
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-center mb-2">
            {debouncedSearch
              ? `Search Results for "${debouncedSearch}"`
              : "Featured Products"}
          </h1>
          <p className="text-muted-foreground text-center">
            {allProducts.length} products found
          </p>
        </div>
        <ProductList
          products={allProducts}
          loading={loading}
          hasMore={hasMore}
          onLoadMore={loadMore}
          showEditButton={true}
        />
        {allProducts.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              {debouncedSearch
                ? "No products found matching your search."
                : "No products available."}
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
