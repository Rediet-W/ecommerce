import { Card, CardContent, CardFooter } from "@/components/ui/card";

export function ProductSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-square bg-gray-200 animate-pulse" />
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse" />
          <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse" />
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="h-10 bg-gray-200 rounded w-full animate-pulse" />
      </CardFooter>
    </Card>
  );
}
