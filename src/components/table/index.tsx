import { PriceHighLight, TableContainer, DeleteItem } from "./styled";
import { dateFormatter, priceFormatter } from "@/utils/formatter";
import { useContextSelector } from "use-context-selector";
import { TransactionsContext } from "@/contexts/TransactionsContext";
import { Trash } from "phosphor-react";

export function Table() {
  const filteredTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.filteredTransactions;
    }
  );
  const deleteTransaction = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.deleteTransaction;
    }
  );

  return (
    <TableContainer>
      <tbody>
        {filteredTransactions?.length ? (
          filteredTransactions.map((item) => (
            <tr key={item.id}>
              <td>
                {item.data.description}
                <DeleteItem onClick={() => deleteTransaction(item.id)}>
                  <Trash />
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
          ))
        ) : (
          <tr key="no-item">
            <td>
              <span>Nenhum item encontrado</span>
            </td>
          </tr>
        )}
      </tbody>
    </TableContainer>
  );
}
