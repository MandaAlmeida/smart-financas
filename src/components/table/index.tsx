import { PriceHighLight, TableContainer } from "./styled";
import { dateFormatter, priceFormatter } from "@/utils/formatter";
import { useContextSelector } from "use-context-selector";
import { TransactionsContext } from "@/contexts/TransactionsContext";
import { X } from "phosphor-react";

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

  return (
    <TableContainer>
      <tbody>
        {transactions?.map((item) => (
          <tr key={item.id}>
            <td>{item.data.description}</td>
            <td>
              <PriceHighLight variant={item.data.type}>
                {item.data.type === "outcome" && "- "}
                {priceFormatter.format(item.data.price)}
              </PriceHighLight>
            </td>
            <td>{item.data.category}</td>
            <td>{dateFormatter.format(item.data.createdAt)}</td>
            <td>
              <button onClick={() => deleteTransaction(item.id)}>
                <X />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </TableContainer>
  );
}
