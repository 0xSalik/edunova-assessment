import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FilterIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

interface FilterPopoverProps {
  onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
  roles: string[];
  teams: string[];
}

const roles = [
  "Product Designer",
  "Product Manager",
  "Frontend Developer",
  "Backend Developer",
];
const teams = ["Design", "Product", "Marketing"];

export function FilterPopover({ onFilterChange }: FilterPopoverProps | any) {
  const [filters, setFilters] = useState<FilterState>({ roles: [], teams: [] });
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterChange = (category: "roles" | "teams", item: string) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      if (newFilters[category].includes(item)) {
        newFilters[category] = newFilters[category].filter((i) => i !== item);
      } else {
        newFilters[category] = [...newFilters[category], item];
      }
      return newFilters;
    });
  };

  const applyFilters = () => {
    onFilterChange(filters);
    setIsOpen(false);
  };

  const isFilterActive = filters.roles.length > 0 || filters.teams.length > 0;
  function resetFilters() {
    return setFilters({ roles: [], teams: [] });
  }
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "p-2",
            isFilterActive && "bg-primary text-primary-foreground"
          )}
          onClick={() => setIsOpen(true)}
        >
          <FilterIcon className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex flex-col justify-between">
          <div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Roles</h3>
                {roles.map((role) => (
                  <div key={role} className="flex items-center space-x-2">
                    <Checkbox
                      id={role}
                      checked={filters.roles.includes(role)}
                      onCheckedChange={() => handleFilterChange("roles", role)}
                    />
                    <label htmlFor={role}>{role}</label>
                  </div>
                ))}
              </div>
              <div>
                <h3 className="font-semibold mb-2">Teams</h3>
                {teams.map((team) => (
                  <div key={team} className="flex items-center space-x-2">
                    <Checkbox
                      id={team}
                      checked={filters.teams.includes(team)}
                      onCheckedChange={() => handleFilterChange("teams", team)}
                    />
                    <label htmlFor={team}>{team}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center items-center gap-4 mt-4">
              <Button onClick={applyFilters}>Save</Button>
              <Button variant={"outline"} onClick={resetFilters}>
                Reset
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
