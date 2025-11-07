"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { FavoriteButton } from "@/components/products/FavoriteButton";
import { ProductSkeleton } from "@/components/products/ProductSkeleton";
import { Star, ArrowLeft, ShoppingCart } from "lucide-react";
import { productService } from "@/services/productService";
import { Product } from "@/types/product";
import { formatPrice, formatRating } from "@/lib/utils/formatters";
import Link from "next/link";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = parseInt(params.id as string);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const productData = await productService.getProductById(productId);
        setProduct(productData);
      } catch (err) {
        setError("Failed to load product");
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8 pt-24">
          <ProductSkeleton />
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8 pt-24">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-8">
              {error || "The product you are looking for does not exist."}
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => router.back()} variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go Back
              </Button>
              <Link href="/">
                <Button>Continue Shopping</Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 pt-24">
        {/* Navigation */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="pl-0 group hover:bg-transparent"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Products
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="aspect-square relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 shadow-2xl group">
              <img
                src={product.images[selectedImage] || product.thumbnail}
                alt={product.title}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
              />

              {/* Discount Badge */}
              {product.discountPercentage > 0 && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                  {product.discountPercentage}% OFF
                </div>
              )}

              {/* Favorite Button */}
              <div className="absolute top-4 right-4">
                <FavoriteButton product={product} size="lg" />
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square overflow-hidden rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                      selectedImage === index
                        ? "border-blue-500 shadow-lg"
                        : "border-transparent hover:border-blue-300"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Rating and Brand */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="text-lg font-semibold">
                  {formatRating(product.rating)}
                </span>
              </div>
              <span className="text-lg text-muted-foreground capitalize">
                {product.brand}
              </span>
              <span className="text-lg text-muted-foreground capitalize">
                {product.category}
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <div className="text-4xl font-bold text-green-600">
                {formatPrice(product.price)}
              </div>
              {product.discountPercentage > 0 && (
                <div className="text-xl text-red-500 line-through">
                  {formatPrice(
                    product.price / (1 - product.discountPercentage / 100)
                  )}
                </div>
              )}
            </div>

            {/* Stock Status */}
            <div
              className={`text-lg font-medium ${
                product.stock > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </div>

            {/* Product Details */}
            <div className="border-t pt-6 space-y-4">
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Brand</span>
                <span className="font-medium capitalize">{product.brand}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Category</span>
                <span className="font-medium capitalize">
                  {product.category}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Availability</span>
                <span
                  className={`font-medium ${
                    product.stock > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Rating</span>
                <span className="font-medium flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  {formatRating(product.rating)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
