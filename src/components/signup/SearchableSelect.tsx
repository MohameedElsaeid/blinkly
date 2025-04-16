
import { useState, useEffect, useRef } from "react";
import { Check, ChevronsUpDown, Search, X } from "lucide-react";
import { 
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface Item {
  value: string;
  label: string;
}

interface SearchableSelectProps {
  items: Item[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  emptyMessage?: string;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  prefix?: React.ReactNode;
}

export const SearchableSelect = ({
  items,
  value,
  onChange,
  placeholder,
  emptyMessage = "No results found.",
  className,
  triggerClassName,
  contentClassName,
  prefix
}: SearchableSelectProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset search when opening/closing
  useEffect(() => {
    if (!open) {
      setSearch("");
    }
  }, [open]);
  
  // Focus input on open
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [open]);

  const selectedItem = items.find(item => item.value === value);
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-full justify-between ${triggerClassName || ""}`}
        >
          <div className="flex items-center gap-2 truncate">
            {prefix}
            {selectedItem ? (
              <span className="truncate">{selectedItem.label}</span>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={`p-0 ${contentClassName || ""}`} align="start" sideOffset={5} style={{ width: 'var(--radix-popover-trigger-width)', maxHeight: '60vh' }}>
        <Command className={className}>
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <CommandInput 
              ref={inputRef}
              placeholder="Search..." 
              value={search}
              onValueChange={setSearch}
              className="h-9 flex-1"
            />
            {search && (
              <Button
                variant="ghost"
                type="button"
                className="h-6 w-6 p-0 rounded-md"
                onClick={() => setSearch("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <ScrollArea className="max-h-[300px]">
            <CommandList>
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              <CommandGroup>
                {items.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    onSelect={() => {
                      onChange(item.value);
                      setOpen(false);
                    }}
                    className="flex items-center"
                  >
                    <Check
                      className={`mr-2 h-4 w-4 ${
                        value === item.value ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    {item.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
