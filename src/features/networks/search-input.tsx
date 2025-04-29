"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";

export const SearchInput = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
  
    function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
      const params = new URLSearchParams(searchParams);
      const search = e.target.value;
  
      if (search) {
        params.set("search", search);
      } else {
        params.delete("search");
      }
  
      router.push(`/?${params.toString()}`);
    }
  
    return (
      <Input
        type="text"
        placeholder="Search by network or company..."
        defaultValue={searchParams.get("search") || ""}
        onChange={handleSearchChange}
        className="max-w-sm"
      />
    );
};
