"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductForm } from "@/components/forms/ProductForm";
import { Button } from "@/components/ui/button";
import { ProductSkeleton } from "@/components/products/ProductSkeleton";
import { DeleteConfirmationModal } from "@/components/products/DeleteConfirmationModal";
import { ArrowLeft, Trash2 } from "lucide-react";
import { Product } from "@/types/product";
import { productService } from "@/services/productService";
import { toast } from "sonner";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const productId = parseInt(params.id as string);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const productData = await productService.getProductById(productId);
        setProduct(productData);
      } catch (error) {
        console.error("Failed to load product:", error);
        toast.error("Failed to load product");
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId, router]);

  const handleSubmitSuccess = () => {
    toast.success("Product updated successfully!");
    router.push("/");
    router.refresh();
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await productService.deleteProduct(productId);
      toast.success("Product deleted successfully!");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Failed to delete product:", error);
      toast.error("Failed to delete product");
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const openDeleteModal = () => setShowDeleteModal(true);
  const closeDeleteModal = () => setShowDeleteModal(false);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <ProductSkeleton />
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The product you are trying to edit does not exist.
            </p>
            <Button onClick={() => router.push("/")}>Back to Products</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 container mx-auto px-4 py-8 pt-24">
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="pl-0"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Button>

            <Button
              variant="destructive"
              onClick={openDeleteModal}
              disabled={deleting}
              className="flex items-center gap-2 text-white bg-red-500"
            >
              <Trash2 className="h-4 w-4" />
              {deleting ? "Deleting..." : "Delete "}
            </Button>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Edit Product</h1>
              <p className="text-muted-foreground">
                Update the product details below.
              </p>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <ProductForm
                product={product}
                onSubmitSuccess={handleSubmitSuccess}
                isEditing={true}
              />
            </div>
          </div>

          {/* Delete Confirmation Modal */}
          <DeleteConfirmationModal
            isOpen={showDeleteModal}
            onClose={closeDeleteModal}
            onConfirm={handleDelete}
            productName={product.title}
            isLoading={deleting}
          />
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
}
