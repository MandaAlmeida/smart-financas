import { PriceHighLight, TableContainer, DeleteItem } from "./styled";
import { dateFormatter, priceFormatter } from "@/utils/formatter";
import { useContextSelector } from "use-context-selector";
import { TransactionsContext } from "@/contexts/TransactionsContext";
import { X } from "phosphor-react";
import { useState } from "react";

export function Table() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions;
  });
  const deleteTransaction = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.deleteTransaction;
    }
  );

  const filtered = useContextSelector(TransactionsContext, (context) => {
    return context.filtered;
  });

  return (
    <TableContainer>
      <tbody>
        {transactions?.map((item) => {
          return filtered ? (
            <tr key={item.id}>
              <td>
                {item.data.description}
                <DeleteItem onClick={() => deleteTransaction(item.id)}>
                  <X />
                </DeleteItem>
              </td>
              <td>
                <PriceHighLight variant={item.data.type}>
                  {item.data.type === "outcome" && "- "}
                  {priceFormatter.format(item.data.price)}
                </PriceHighLight>
              </td>
              <td>{item.data.category}</td>
              <td>{dateFormatter.format(item.data.createdAt)}</td>
            </tr>
          ) : (
            <tr key={item.id}>
              <td>
                <span>Nenhum item encontrado</span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </TableContainer>
  );
}
