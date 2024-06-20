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
  const Filter = useContextSelector(TransactionsContext, (context) => {
    return context.Filter;
  });
  return (
    <ContainerCalendar>
      <Popover.Root>
        <Popover.Trigger asChild>
          <section>
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
            locale={ptBR}
          />
          <button onClick={Filter} className="save">
            Salvar
          </button>
        </SectionCalendar>
      </Popover.Root>

      {/* <button>
        <Funnel />
      </button> */}
    </ContainerCalendar>
  );
}
