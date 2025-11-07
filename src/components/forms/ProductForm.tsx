"use client";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category, Product } from "@/types/product";
import { productSchema, ProductFormData } from "@/lib/validators/productSchema";
import { productService } from "@/services/productService";
import { toast } from "sonner";

interface ProductFormProps {
  product?: Product;
  onSubmitSuccess?: () => void;
  isEditing?: boolean;
}

export function ProductForm({
  product,
  onSubmitSuccess,
  isEditing = false,
}: ProductFormProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: product
      ? {
          title: product.title,
          description: product.description,
          price: product.price,
          stock: product.stock,
          brand: product.brand,
          category: product.category,
        }
      : {
          title: "",
          description: "",
          price: undefined,
          stock: undefined,
          brand: "",
          category: "",
        },
  });

  // Load categories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await productService.getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Failed to load categories:", error);
        toast.error("Failed to load categories");
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    if (product) {
      reset({
        title: product.title,
        description: product.description,
        price: product.price,
        stock: product.stock,
        brand: product.brand,
        category: product.category,
      });
    }
  }, [product, reset]);

  const onSubmit = async (data: ProductFormData) => {
    setLoading(true);
    try {
      const formData = {
        ...data,
        price: Number(data.price) || 0,
        stock: Number(data.stock) || 0,
      };

      if (isEditing && product) {
        await productService.updateProduct(product.id, formData);
        toast.success("Product updated successfully!");
      } else {
        await productService.createProduct(formData);
        toast.success("Product created successfully!");
      }
      onSubmitSuccess?.();
    } catch (error) {
      console.error("Failed to save product:", error);
      toast.error(`Failed to ${isEditing ? "update" : "create"} product`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">Product Title *</Label>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Input id="title" placeholder="Enter product title" {...field} />
          )}
        />
        {errors.title && (
          <p className="text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Textarea
              id="description"
              placeholder="Enter product description"
              rows={4}
              {...field}
            />
          )}
        />
        {errors.description && (
          <p className="text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      {/* Price and Stock */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Price ($) *</Label>
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={field.value || ""}
                onChange={(e) =>
                  field.onChange(
                    e.target.value === ""
                      ? undefined
                      : parseFloat(e.target.value)
                  )
                }
                onBlur={field.onBlur}
              />
            )}
          />
          {errors.price && (
            <p className="text-sm text-red-600">{errors.price.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="stock">Stock Quantity *</Label>
          <Controller
            name="stock"
            control={control}
            render={({ field }) => (
              <Input
                id="stock"
                type="number"
                min="0"
                placeholder="0"
                value={field.value || ""}
                onChange={(e) =>
                  field.onChange(
                    e.target.value === "" ? undefined : parseInt(e.target.value)
                  )
                }
                onBlur={field.onBlur}
              />
            )}
          />
          {errors.stock && (
            <p className="text-sm text-red-600">{errors.stock.message}</p>
          )}
        </div>
      </div>

      {/* Brand */}
      <div className="space-y-2">
        <Label htmlFor="brand">Brand *</Label>
        <Controller
          name="brand"
          control={control}
          render={({ field }) => (
            <Input id="brand" placeholder="Enter brand name" {...field} />
          )}
        />
        {errors.brand && (
          <p className="text-sm text-red-600">{errors.brand.message}</p>
        )}
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label htmlFor="category">Category *</Label>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue
                  placeholder="Select a category"
                  className="bg-white text-black"
                />
              </SelectTrigger>
              <SelectContent className="z-50 bg-white text-black">
                {categories.map((category) => (
                  <SelectItem key={category.slug} value={category.slug}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.category && (
          <p className="text-sm text-red-600">{errors.category.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex gap-4 pt-4">
        <Button
          type="submit"
          disabled={loading}
          className="flex-1 bg-blue-500 text-white"
          size="lg"
        >
          {loading
            ? "Saving..."
            : isEditing
              ? "Update Product"
              : "Create Product"}
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() => reset()}
          disabled={loading}
        >
          Reset
        </Button>
      </div>
    </form>
  );
}
