import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Check, ChevronsUpDown, PlusIcon } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";
import { cn } from "../lib/utils";

type ComboboxProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    items: {
        value: string;
        label: string;
    }[];
    value?: string;
    setValue: (value: string) => void;
    placeholder: string;
    onAddButtonClicked: (v: string) => void;
};

export default function Combobox({
    open,
    setOpen,
    items,
    value,
    setValue,
    placeholder,
    onAddButtonClicked,
}: ComboboxProps) {
    const [inputValue, setInputValue] = useState("");
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
                    {value ? items.find((item) => item.value === value)?.label : placeholder}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput
                        placeholder={placeholder}
                        className="h-9"
                        value={inputValue}
                        onValueChange={setInputValue}
                    />
                    <CommandList>
                        <CommandEmpty className="flex my-2 mx-2 gap-2 items-center text-xs">
                            <Button
                                variant={"ghost"}
                                className="aspect-square cursor-pointer"
                                onClick={() => onAddButtonClicked(inputValue)}
                            >
                                <PlusIcon />
                            </Button>
                            <span>{inputValue || "Digite para adicionar"}</span>
                        </CommandEmpty>
                        <CommandGroup>
                            {items.map((item) => (
                                <CommandItem
                                    key={item.value}
                                    value={item.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue);
                                        setOpen(false);
                                    }}
                                >
                                    {item.label}
                                    <Check
                                        className={cn("ml-auto", value === item.value ? "opacity-100" : "opacity-0")}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
