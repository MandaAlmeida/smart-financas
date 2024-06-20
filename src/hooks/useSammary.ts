"use client";
import { useContextSelector } from "use-context-selector";
import { TransactionsContext } from "../contexts/TransactionsContext";

export function useSummary() {
  const filteredTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.filteredTransactions;
    }
  );

  const summary = filteredTransactions.reduce(
    (acc, transaction) => {
      {
        if (transaction.data.type === "income") {
          acc.income += transaction.data.price;
          acc.total += transaction.data.price;
        } else {
          acc.outcome += transaction.data.price;
          acc.total -= transaction.data.price;
        }
      }
      return acc;
    },
    {
      income: 0,
      outcome: 0,
      total: 0,
    }
  );

  return summary;
}
