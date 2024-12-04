import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from "phosphor-react";
import { SummaryCard, SummaryContainer } from "./styles";
import { priceFormatter } from "@/utils/formatter";
import { useSummary } from "@/hooks/useSammary";


export function Summary() {
  const summary = useSummary();

  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Saldo</span>
          <CurrencyDollar size={32} color="#00A272" />
        </header>
        <strong>{priceFormatter.format(summary.total)}</strong>
      </SummaryCard>
      <section>
        <SummaryCard>
          <header>
            <span>Entradas</span>
            <ArrowCircleUp size={32} color="#00A272" />
          </header>
          <strong>{priceFormatter.format(summary.income)}</strong>
        </SummaryCard>
        <SummaryCard>
          <header>
            <span>Saídas</span>
            <ArrowCircleDown size={32} color="#F75A68" />
          </header>
          <strong>{priceFormatter.format(summary.outcome)}</strong>
        </SummaryCard>
      </section>
    </SummaryContainer>
  );
}
