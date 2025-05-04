"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
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
      <div className="relative w-full lg:max-w-sm">
        <Input
          type="text"
          icon={<Search className="size-4" />}
          variant="secondary"
          placeholder="Search network"
          defaultValue={searchParams.get("search") || ""}
          onChange={handleSearchChange}
          className="pl-14"
        />
      </div>
    );
};
