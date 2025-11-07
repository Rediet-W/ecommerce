"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Heart,
  Plus,
  Sun,
  Moon,
  Menu,
  X,
  User,
  LogOut,
  ShoppingBag,
  Settings,
} from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { useAuth } from "@/hooks/useAuth";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { toggleDarkMode } from "@/store/slices/uiSlice";
import { LogoutConfirmationModal } from "@/components/auth/LogoutConfirmationModal";

export function Header() {
  const { favoritesCount } = useFavorites();
  const { user, isAuthenticated, logout } = useAuth();
  const darkMode = useAppSelector((state) => state.ui.darkMode);
  const dispatch = useAppDispatch();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Apply dark mode class to HTML element
  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) html.classList.add("dark");
    else html.classList.remove("dark");
  }, [darkMode]);

  // Scroll effect for header
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggleDarkMode = () => dispatch(toggleDarkMode());
  const toggleMobile = () => setMobileOpen((s) => !s);
  const closeMobile = () => setMobileOpen(false);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
    closeMobile();
  };

  const handleLogoutConfirm = async () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      logout();
      setShowLogoutModal(false);
      setIsLoggingOut(false);
    }, 500);
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/80 backdrop-blur-md border-b shadow-xl"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 group"
              onClick={closeMobile}
            >
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <ShoppingBag className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ShopHub
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center space-x-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleToggleDarkMode}
                className="rounded-xl hover:bg-accent/50 hover:scale-110 transition-all duration-300 backdrop-blur-sm"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <Sun className="h-5 w-5 text-yellow-500" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-700" />
                )}
              </Button>

              {isAuthenticated ? (
                <>
                  <Link href="/create-product">
                    <Button
                      variant="default"
                      size="sm"
                      className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 rounded-xl font-semibold"
                    >
                      <Plus className="h-4 w-4" />
                      Add Product
                    </Button>
                  </Link>

                  <Link href="/favorites">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 relative border-2 hover:border-red-300 hover:bg-red-50 dark:hover:bg-red-950 hover:scale-105 active:scale-95 transition-all duration-300 rounded-xl group"
                    >
                      <Heart className="h-4 w-4 text-red-500 group-hover:scale-110 transition-transform" />
                      Favorites
                      {favoritesCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg animate-pulse">
                          {favoritesCount}
                        </span>
                      )}
                    </Button>
                  </Link>

                  {/* User Info with Visible Logout Button */}
                  <div className="flex items-center gap-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl px-3 py-2 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-1 rounded-lg">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <div className="text-sm">
                        <div className="font-medium text-foreground">
                          {user?.name}
                        </div>
                        <div className="text-xs text-muted-foreground hidden lg:block">
                          {user?.email}
                        </div>
                      </div>
                    </div>

                    {/* Visible Logout Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleLogoutClick}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg p-2 transition-all duration-200"
                      title="Logout"
                    >
                      <LogOut className="h-4 w-4" />
                    </Button>

                    {/* User Dropdown for Additional Options */}
                  </div>
                </>
              ) : (
                <Link href="/login">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-xl hover:scale-105 active:scale-95 transition-all duration-300 border-2 font-semibold"
                  >
                    Sign In
                  </Button>
                </Link>
              )}
            </nav>

            {/* Mobile actions */}
            <div className="md:hidden flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleToggleDarkMode}
                aria-label="Toggle dark mode"
                className="rounded-xl hover:bg-accent/50"
              >
                {darkMode ? (
                  <Sun className="h-5 w-5 text-yellow-500" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-700" />
                )}
              </Button>

              <button
                onClick={toggleMobile}
                aria-expanded={mobileOpen}
                aria-label="Toggle menu"
                className="p-2 rounded-xl hover:bg-accent/50 transition-all duration-150"
              >
                {mobileOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden bg-background border-t shadow-md transition-all duration-300 overflow-hidden ${
            mobileOpen ? "max-h-96 opacity-100 py-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="container mx-auto px-4 space-y-3">
            {isAuthenticated ? (
              <>
                <Link href="/create-product" onClick={closeMobile}>
                  <Button
                    variant="default"
                    size="sm"
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                  >
                    <Plus className="h-4 w-4" />
                    Add Product
                  </Button>
                </Link>

                <Link href="/favorites" onClick={closeMobile}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full flex items-center justify-center gap-2 relative border-2"
                  >
                    <Heart className="h-4 w-4 text-red-500" />
                    Favorites
                    {favoritesCount > 0 && (
                      <span className="ml-2 inline-block bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg">
                        {favoritesCount}
                      </span>
                    )}
                  </Button>
                </Link>

                <div className="pt-3 border-t">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-1 rounded-lg">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">{user?.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {user?.email}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      onClick={handleLogoutClick}
                      className="text-red-600 hover:bg-red-50 dark:hover:bg-red-950 rounded-xl"
                    >
                      <LogOut className="h-4 w-4" />
                      <span className="sr-only">Logout</span>
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <Link href="/login" onClick={closeMobile}>
                <Button variant="default" size="sm" className="w-full">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      <LogoutConfirmationModal
        isOpen={showLogoutModal}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
        isLoading={isLoggingOut}
      />
    </>
  );
}
