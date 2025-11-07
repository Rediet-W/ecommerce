"use client";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductGrid } from "@/components/products/ProductGrid";
import { useFavorites } from "@/hooks/useFavorites";
import { Button } from "@/components/ui/button";
import { ShoppingBag, HeartOff } from "lucide-react";
import Link from "next/link";

export default function FavoritesPage() {
  const { favorites, favoritesCount, clearFavorites } = useFavorites();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 pt-24">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Your Favorites</h1>
            <p className="text-muted-foreground">
              {favoritesCount} {favoritesCount === 1 ? "product" : "products"}{" "}
              saved
            </p>
          </div>

          {favoritesCount > 0 && (
            <Button
              variant="outline"
              onClick={clearFavorites}
              className="flex items-center gap-2"
            >
              <HeartOff className="h-4 w-4" />
              Clear All
            </Button>
          )}
        </div>

        {favoritesCount > 0 ? (
          <ProductGrid products={favorites} />
        ) : (
          <div className="text-center py-16">
            <HeartOff className="h-24 w-24 text-muted-foreground mx-auto mb-6 opacity-50" />
            <h2 className="text-2xl font-semibold mb-4">No favorites yet</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Start exploring our products and add your favorites to this list
              for easy access later.
            </p>
            <Link href="/">
              <Button size="lg" className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                Start Shopping
              </Button>
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
