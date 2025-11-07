"use client";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductForm } from "@/components/forms/ProductForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function CreateProductPage() {
  const router = useRouter();

  const handleSubmitSuccess = () => {
    toast.success("Product created successfully!");
    router.push("/");
    router.refresh();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 pt-24">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="pl-0"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Button>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Create New Product</h1>
            <p className="text-muted-foreground">
              Add a new product to your store. Fill in all the required details
              below.
            </p>
          </div>

          <div className="bg-card border rounded-lg p-6">
            <ProductForm onSubmitSuccess={handleSubmitSuccess} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
