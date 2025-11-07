import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";
import { ProductSkeleton } from "./ProductSkeleton";

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  skeletonCount?: number;
  showEditButton?: boolean; // ADD THIS
}

export function ProductGrid({
  products,
  loading = false,
  skeletonCount = 8,
  showEditButton = false, // ADD THIS WITH DEFAULT
}: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          showEditButton={showEditButton} // PASS THE PROP
        />
      ))}
    </div>
  );
}
