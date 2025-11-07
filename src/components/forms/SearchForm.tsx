"use client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchFormProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchForm({
  value,
  onChange,
  placeholder = "Search...",
}: SearchFormProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 pr-4 py-2 w-full"
      />
    </div>
  );
}
