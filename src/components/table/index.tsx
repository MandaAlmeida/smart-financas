import {
  PriceHighLight,
  TableContainer,
  DeleteItem,
  EditItem,
  ContainerItens,
} from "./styled";
import { dateFormatter, priceFormatter } from "@/utils/formatter";
import { useContextSelector } from "use-context-selector";
import {
  Transaction,
  TransactionsContext,
} from "@/contexts/TransactionsContext";
import { PencilSimpleLine, Trash } from "phosphor-react";
import { useState } from "react";
import { Pagination } from "../pagination/index";
import * as Dialog from "@radix-ui/react-dialog";
import { ModalEdition } from "../modalEdition";

interface PaginatedTableProps {
  itemsPerPage: number;
}

interface Item {
  id: string;
  data: Transaction;
}

export function Table({ itemsPerPage }: PaginatedTableProps) {
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

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const handlePageChange = (action: string) => {
    switch (action) {
      case "next":
        setCurrentPage(currentPage + 1);
        break;
      case "previous":
        setCurrentPage(currentPage - 1);
        break;
      case "first":
        setCurrentPage(1);
        break;
      case "last":
        setCurrentPage(totalPages);
        break;
      default:
        break;
    }
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredTransactions.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const [isOpen, setIsOpen] = useState(false);

  const [currentTransaction, setCurrentTransaction] = useState<Item | null>(
    null
  );

  return (
    <>
      <TableContainer>
        <tbody>
          {paginatedItems?.length ? (
            paginatedItems.map((item) => (
              <tr key={item.id}>
                <td>{item.data.description}</td>
                <td>
                  <PriceHighLight variant={item.data.type}>
                    {item.data.type === "outcome" && "- "}
                    {priceFormatter.format(item.data.price)}
                  </PriceHighLight>
                </td>
                <td>{item.data.category}</td>
                {item.data.createdAt === 0 ? (
                  <td>Mensal</td>
                ) : (
                  <td>{dateFormatter.format(item.data.createdAt)}</td>
                )}
                <ContainerItens>
                  <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
                    <Dialog.Trigger asChild>
                      <EditItem
                        onClick={() => {
                          setIsOpen(true);
                          setCurrentTransaction(item);
                        }}
                      >
                        <PencilSimpleLine />
                      </EditItem>
                    </Dialog.Trigger>
                    {currentTransaction && (
                      <ModalEdition
                        id={currentTransaction.id}
                        data={currentTransaction.data}
                        setIsOpen={setIsOpen}
                      />
                    )}
                  </Dialog.Root>
                  <DeleteItem onClick={() => deleteTransaction(item.id)}>
                    <Trash />
                  </DeleteItem>
                </ContainerItens>
              </tr>
            ))
          ) : (
            <tr key="no-item">
              <td className="no-item">
                <span>Nenhum item encontrado</span>
              </td>
            </tr>
          )}
        </tbody>
      </TableContainer>
      <Pagination
        totalCount={filteredTransactions.length}
        onPageChange={handlePageChange}
        pageIndex={currentPage}
        perPage={totalPages}
      />
    </>
  );
}
