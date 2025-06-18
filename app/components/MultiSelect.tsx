import * as React from "react";

import { X, ChevronsUpDown, ChevronsDown, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";

export type OptionType = {
  label: string;
  value: string;
};

interface MultiSelectProps {
  options: OptionType[];
  selected: string[];
  onChange: (selected: string[]) => void;
  className?: string;
  placeholder?: string;
}

export default function MultiSelect({
  options,
  selected,
  onChange,
  placeholder,
  ...props
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  const handleUnselect = (item: string) => {
    onChange(selected.filter((i) => i !== item));
  };

  return (
    <Popover open={open} onOpenChange={setOpen} {...props}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-full justify-between h-auto overflow-hidden hover:bg-background`}
          onClick={() => setOpen(!open)}
        >
          <div className="flex gap-1 flex-wrap items-center">
            <span className="text-muted-foreground font-normal">
              {selected.length === 0 && placeholder}
            </span>
            {selected.map((item) => (
              <Badge
                variant="secondary"
                key={item}
                className="text-xs font-normal"
                onClick={(e) => {
                  e.stopPropagation();
                  handleUnselect(item);
                }}
              >
                {options.find((v) => v.value == item)?.label ?? item}
                <div
                  className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(item)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </div>
              </Badge>
            ))}
          </div>
          <ChevronDown className="h-4 w-4 shrink-0 opacity-50 text-gray-500" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <div className="flex flex-col w-full min-w-48 px-2 py-1 max-h-60 overflow-auto select-none">
          {options.map((op) => (
            <div
              key={op.value}
              className="text-foreground flex gap-2 hover:bg-background py-2 items-center cursor-pointer px-2"
              onClick={(e) => {
                if (
                  (e.target as HTMLElement).tagName !== "INPUT" &&
                  (e.target as HTMLElement).tagName !== "LABEL"
                ) {
                  onChange(
                    selected.includes(op.value)
                      ? selected.filter((v) => v !== op.value)
                      : [...selected, op.value]
                  );
                }
              }}
            >
              <Checkbox
                id={op.value}
                checked={selected.includes(op.value)}
                onCheckedChange={(c:any) => {
                  if (!c) {
                    handleUnselect(op.value);
                  } else {
                    onChange([...selected, op.value]);
                  }
                }}
                onClick={(e:any) => e.stopPropagation()}
              />
              <label
                htmlFor={op.value}
                className="text-sm font-sm leading-none align-middle cursor-pointer"
              >
                {op.label}
              </label>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
