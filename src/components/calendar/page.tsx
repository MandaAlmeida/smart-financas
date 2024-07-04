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
  const today = new Date();
  const disabledDates = {
    from: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
    to: new Date(2050, 11, 31),
  };
  return (
    <ContainerCalendar>
      <Popover.Root>
        <Popover.Trigger asChild>
          <section className="cursor-pointer">
            <CalendarIcon />

            {range?.from &&
              range?.to &&
              (range.from.getTime() === range.to.getTime() ? (
                <span>{`Periodo: ${monthFormatter.format(range.from)}`}</span>
              ) : range.from.getTime() <= range.to.getTime() ? (
                <span>{`Periodo: ${monthFormatter.format(
                  range.from
                )} à ${monthFormatter.format(range.to)}`}</span>
              ) : (
                <span>{`Periodo: ${monthFormatter.format(
                  range.to
                )} à ${monthFormatter.format(range.from)}`}</span>
              ))}
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
            toYear={2050}
            locale={ptBR}
            disabled={disabledDates}
          />
        </SectionCalendar>
      </Popover.Root>

      {/* <button>
        <Funnel />
      </button> */}
    </ContainerCalendar>
  );
}
