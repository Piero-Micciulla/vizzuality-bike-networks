"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialValue = searchParams.get("search") || "";

  const [searchValue, setSearchValue] = useState(initialValue);

  useEffect(() => {
    setSearchValue(searchParams.get("search") || "");
  }, [searchParams]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchValue(newValue);

    const params = new URLSearchParams(searchParams.toString());

    if (newValue) {
      params.set("search", newValue);
    } else {
      params.delete("search");
    }

    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="relative w-full lg:max-w-sm">
      <Input
        type="text"
        icon={<Search className="size-4" />}
        variant="secondary"
        placeholder="Search network"
        value={searchValue}
        onChange={handleSearchChange}
        className="pl-14"
        aria-label="Search networks"
      />
    </div>
  );
};