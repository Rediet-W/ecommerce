import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title too long"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description too long"),
  price: z
    .number()
    .min(0, "Price must be positive")
    .max(10000, "Price too high"),
  stock: z.number().int().min(0, "Stock cannot be negative"),
  brand: z.string().min(1, "Brand is required").max(50, "Brand name too long"),
  category: z.string().min(1, "Category is required"),
});

export type ProductFormData = z.infer<typeof productSchema>;
