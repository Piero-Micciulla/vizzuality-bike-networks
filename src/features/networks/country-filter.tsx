"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import countries from "@/data/countries.json";

export const CountryFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  function handleCountrySelect(value: string) {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("country", value);
    } else {
      params.delete("country");
    }

    router.push(`/?${params.toString()}`);
    setSearchTerm("");
    setOpen(false);
    setHighlightedIndex(0);
  }

  const filteredCountries = countries.data
    .filter((country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, 5);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        Math.min(prev + 1, filteredCountries.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const selected = filteredCountries[highlightedIndex];
      if (selected) {
        handleCountrySelect(selected.code);
      }
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[200px] justify-center">
          Country
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px]">
        <Input
          placeholder="Search country..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setHighlightedIndex(0);
          }}
          onKeyDown={handleKeyDown}
          className="mb-2"
        />
        <div className="max-h-[200px] overflow-auto">
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country, idx) => (
              <button
                key={country.code}
                onClick={() => handleCountrySelect(country.code)}
                className={`w-full text-left px-2 py-1 rounded ${
                  idx === highlightedIndex ? "bg-gray-100" : "hover:bg-gray-100"
                }`}
              >
                {country.name}
              </button>
            ))
          ) : (
            <div className="text-center text-gray-500 py-2">
              No countries found
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};