"use client";

import { format, parse } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "./ui/input";
import { useState } from "react";

type DatePickerProps = {
    date?: Date;
    onChange?: (date?: Date) => void;
};

export function DatePicker({ date, onChange }: DatePickerProps) {
    const [dateString, setDateString] = useState("");
    return (
        <Popover modal={true}>
            <div className="relative w-full">
                <Input
                    type="string"
                    placeholder="Escolha uma data"
                    value={dateString}
                    onChange={(e) => {
                        setDateString(e.target.value);
                        const parsedDate = parse(e.target.value, "dd/MM/yyyy", new Date());
                        if (parsedDate.toString() === "Invalid Date") {
                            if (onChange) onChange;
                        } else {
                            if (onChange) onChange(parsedDate);
                        }
                    }}
                />
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "font-normal absolute right-0 translate-y-[-50%] top-[50%] rounded-l-none",
                            !date && "text-muted-foreground",
                        )}
                    >
                        <CalendarIcon className="w-4 h-4" />
                    </Button>
                </PopoverTrigger>
            </div>

            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(v) => {
                        if (onChange) onChange(v);
                        if (!v) return;
                        setDateString(format(v, "dd/MM/yyyy"));
                    }}
                    initialFocus
                    defaultMonth={date}
                    locale={ptBR}
                />
            </PopoverContent>
        </Popover>
    );
}

<Popover></Popover>;
