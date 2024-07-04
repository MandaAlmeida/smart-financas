"use client";

import { Calendar as CalendarIcon, Funnel } from "phosphor-react";
import { ContainerCalendar, SectionCalendar } from "./styles";
import { useContextSelector } from "use-context-selector";
import { ptBR } from "date-fns/locale";
import { monthFormatter } from "@/utils/formatter";
import { Calendar } from "../ui/calendar";
import { TransactionsContext } from "@/contexts/TransactionsContext";
import * as Popover from "@radix-ui/react-popover";

export default function CalendarMonth() {
  const range = useContextSelector(TransactionsContext, (context) => {
    return context.range;
  });
  const setRange = useContextSelector(TransactionsContext, (context) => {
    return context.setRange;
  });
  return (
    <ContainerCalendar>
      <Popover.Root>
        <Popover.Trigger asChild>
          <section className="cursor-pointer">
            <CalendarIcon />
            {monthFormatter.format(range?.from) <=
            monthFormatter.format(range?.to) ? (
              <span>{`Periodo: ${monthFormatter.format(range?.from)} à 
            ${monthFormatter.format(range?.to)}`}</span>
            ) : (
              <span>{`Periodo:  ${monthFormatter.format(range?.to)}  à 
           ${monthFormatter.format(range?.from)}`}</span>
            )}
          </section>
        </Popover.Trigger>
        <SectionCalendar>
          <Calendar
            mode="range"
            selected={range}
            onSelect={setRange}
            className="rounded-lg w-full"
            captionLayout="dropdown-buttons"
            fromYear={2020}
            toYear={2030}
            locale={ptBR}
          />
        </SectionCalendar>
      </Popover.Root>

      {/* <button>
        <Funnel />
      </button> */}
    </ContainerCalendar>
  );
}
