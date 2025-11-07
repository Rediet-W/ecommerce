"use client";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart, Edit, Zap, Shield } from "lucide-react";
import { Product } from "@/types/product";
import {
  formatPrice,
  formatRating,
  truncateText,
} from "@/lib/utils/formatters";
import { FavoriteButton } from "./FavoriteButton";

interface ProductCardProps {
  product: Product;
  showEditButton?: boolean;
}

export function ProductCard({
  product,
  showEditButton = false,
}: ProductCardProps) {
  const isNew = product.id % 5 === 0;
  const isTrending = product.rating > 4.5;

  return (
    <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-2xl">
      {/* Background Gradient Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <Link href={`/product/${product.id}`}>
        <div className="aspect-square relative overflow-hidden rounded-t-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out"
          />

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
            <FavoriteButton product={product} size="sm" />
            {showEditButton && (
              <Link href={`/edit-product/${product.id}`}>
                <Button
                  variant="secondary"
                  size="sm"
                  className="h-8 w-8 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950 transition-all duration-300 hover:scale-110"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Edit className="h-3 w-3" />
                </Button>
              </Link>
            )}
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {product.discountPercentage > 15 && (
              <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg transform -translate-x-2 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                🔥 {product.discountPercentage}% OFF
              </div>
            )}
            {isNew && (
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg transform -translate-x-2 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                ✨ New
              </div>
            )}
            {isTrending && (
              <div className="bg-gradient-to-r from-orange-500 to-amber-600 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg transform -translate-x-2 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-300">
                ⚡ Trending
              </div>
            )}
          </div>

          {/* Quick View Overlay */}
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-200">
            <Button
              variant="secondary"
              size="sm"
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-lg rounded-full px-4 font-semibold"
            >
              <Zap className="h-3 w-3 mr-1" />
              Quick View
            </Button>
          </div>
        </div>
      </Link>

      <CardContent className="p-5 relative z-10">
        <div className="space-y-3">
          <Link href={`/product/${product.id}`}>
            <h3 className="font-bold text-lg leading-tight hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 line-clamp-2 group-hover:translate-x-1 transition-transform">
              {truncateText(product.title, 50)}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {truncateText(product.description, 80)}
          </p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 bg-yellow-50 dark:bg-yellow-950 px-2 py-1 rounded-full">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-bold text-yellow-700 dark:text-yellow-300">
                {formatRating(product.rating)}
              </span>
            </div>
          </div>
          <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-full capitalize">
            {product.category}
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0 flex items-center justify-between relative z-10">
        <div className="flex flex-col">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950 px-3 py-1 rounded-lg">
            {formatPrice(product.price)}
          </div>
          {product.discountPercentage > 0 && (
            <div className="text-sm text-red-500 line-through mt-1">
              {formatPrice(
                product.price / (1 - product.discountPercentage / 100)
              )}
            </div>
          )}
        </div>
      </CardFooter>

      {product.stock < 10 && product.stock > 0 && (
        <div className="absolute bottom-2 left-2 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-bold">
          Only {product.stock} left!
        </div>
      )}
    </Card>
  );
}
