import { useCallback } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";
import { toast } from "sonner";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading } = useAppSelector(
    (state) => state.auth
  );

  const handleLogout = useCallback(() => {
    dispatch(logout());
    toast.success("Logged out successfully", { duration: 2000 });
  }, [dispatch]);

  return {
    user,
    isAuthenticated,
    isLoading,
    logout: handleLogout,
  };
};
