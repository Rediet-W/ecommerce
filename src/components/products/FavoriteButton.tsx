"use client";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { Product } from "@/types/product";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  product: Product;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function FavoriteButton({
  product,
  size = "md",
  className,
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();

  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        sizeClasses[size],
        "rounded-full bg-background/80 backdrop-blur-sm",
        isFavorite(product.id) && "bg-red-50 border-red-200 text-red-600",
        className
      )}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(product);
      }}
    >
      <Heart
        className={cn("h-4 w-4", isFavorite(product.id) && "fill-current")}
      />
    </Button>
  );
}
