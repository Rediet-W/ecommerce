import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const usePagination = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  const updatePagination = useCallback(
    (newPage: number, newLimit: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", newPage.toString());
      params.set("limit", newLimit.toString());
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  const nextPage = useCallback(() => {
    updatePagination(page + 1, limit);
  }, [page, limit, updatePagination]);

  const prevPage = useCallback(() => {
    if (page > 1) {
      updatePagination(page - 1, limit);
    }
  }, [page, limit, updatePagination]);

  return {
    page,
    limit,
    skip: (page - 1) * limit,
    updatePagination,
    nextPage,
    prevPage,
  };
};
