"use client";

import * as React from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import * as Popover from "@radix-ui/react-popover";
import { dateFormatter } from "@/utils/formatter";
import { SectionCalendar } from "./styles";

interface DateInputProps {
  value?: Date;
  onValueChange?: (date: Date | undefined) => void;
}

export function DateInput({ value, onValueChange }: DateInputProps) {
  const [date, setDate] = React.useState<Date | undefined>(
    (value = new Date())
  );
  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (onValueChange) {
      onValueChange(selectedDate);
    }
  };

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full h-[51px] p-4 justify-start border-transparent bg-[#121214] rounded-[6px] text-[#C4C4CC]",
            !date && "text-muted-foreground"
          )}
        >
          {dateFormatter.format(date)}
        </Button>
      </Popover.Trigger>
      <SectionCalendar>
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          initialFocus
          locale={ptBR}
          captionLayout="dropdown-buttons"
          fromYear={2020}
          toYear={2030}
          className="bg-[#121214] rounded-xl"
        />
      </SectionCalendar>
    </Popover.Root>
  );
}
