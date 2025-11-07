"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Home, Heart, ShoppingBag } from "lucide-react";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Products", href: "/", icon: ShoppingBag },
  { name: "Favorites", href: "/favorites", icon: Heart },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="flex space-x-1">
      {navigation.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link key={item.name} href={item.href}>
            <Button
              variant={isActive ? "secondary" : "ghost"}
              size="sm"
              className={cn("flex items-center gap-2", isActive && "bg-accent")}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{item.name}</span>
            </Button>
          </Link>
        );
      })}
    </nav>
  );
}
