"use client";
import { useEffect, useRef } from "react";
import { Product } from "@/types/product";
import { ProductGrid } from "./ProductGrid";

interface ProductListProps {
  products: Product[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  showEditButton?: boolean; // ADD THIS
}

export function ProductList({
  products,
  loading,
  hasMore,
  onLoadMore,
  showEditButton = false, // ADD THIS WITH DEFAULT
}: ProductListProps) {
  const observerRef = useRef<IntersectionObserver>();
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasMore || loading) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, loading, onLoadMore]);

  return (
    <div className="space-y-8">
      {/* PASS showEditButton to ProductGrid */}
      <ProductGrid
        products={products}
        loading={loading}
        showEditButton={showEditButton}
      />

      {hasMore && (
        <div ref={loadMoreRef} className="flex justify-center py-8">
          <div className="text-muted-foreground">Loading more products...</div>
        </div>
      )}

      {!hasMore && products.length > 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No more products to load
        </div>
      )}
    </div>
  );
}
