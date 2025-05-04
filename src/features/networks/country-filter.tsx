"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { useIsLargeScreen } from "@/hooks/useIsLargeScreen";
import { Search } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import countries from "@/data/countries.json";
import { MapPin } from "lucide-react";

export const CountryFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isLargeScreen = useIsLargeScreen();

  const selectedCountryCode = searchParams.get("country") || "";
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [isSelected, setIsSelected] = useState(false);

  const filteredCountries = useMemo(
    () =>
      countries.data
        .filter((country) =>
          country.name.toLowerCase().includes(searchTerm.toLowerCase())
        ),
    [searchTerm]
  );

  useEffect(() => {
    if (open && selectedCountryCode) {
      const index = filteredCountries.findIndex(
        (c) => c.code === selectedCountryCode
      );
      setHighlightedIndex(index >= 0 ? index : 0);
    }
  }, [open, filteredCountries, selectedCountryCode]);

  const handleCountrySelect = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("country", value);
    } else {
      params.delete("country");
    }

    router.push(`/?${params.toString()}`);
    setSearchTerm("");
    setOpen(false);
    setIsSelected(false);
  };

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
    <Popover
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        setIsSelected(nextOpen);
      }}
    >
      <PopoverTrigger asChild>
        <Button variant="secondary" isSelected={isSelected}>
          <MapPin className="size-4" />
          Country
        </Button>
      </PopoverTrigger>

      <PopoverContent
        variant="secondary"
        align={isLargeScreen ? "end" : "center"}
        className="max-w-xs min-w-xs"
      >
        <Input
          autoFocus
          placeholder="Search country"
          icon={<Search className="size-4" />}
          variant="tertiary"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setHighlightedIndex(0);
          }}
          onKeyDown={handleKeyDown}
          className="pl-10 pr-4 py-4"
        />
        <div className="pt-2 pb-4 px-4 max-h-[200px] overflow-auto border-t border-zinc-500">
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country, idx) => {
              const isHighlighted = idx === highlightedIndex;
              return (
                <button
                  key={country.code}
                  onClick={() => handleCountrySelect(country.code)}
                  tabIndex={-1}
                  aria-selected={isHighlighted}
                  className={cn(
                    "w-full text-left px-2 py-2 cursor-pointer",
                    isHighlighted ? "bg-torea-200" : "hover:bg-torea-200"
                  )}
                >
                  {country.name}
                </button>
              );
            })
          ) : (
            <div className="text-center text-zinc-500 py-2">
              No countries found
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};