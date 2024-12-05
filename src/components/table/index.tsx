import {
  PriceHighLight,
  TableContainer,
  DeleteItem,
  ContainerItens,
  Button,
  AlertContainer,
  Overlay,
  Content,
  Title,
  Description,
} from "./styled";
import { dateFormatter, priceFormatter } from "@/utils/formatter";
import { useContextSelector } from "use-context-selector";
import {
  TransactionsContext,
} from "@/contexts/TransactionsContext";
import { PencilSimpleLine, Trash } from "phosphor-react";
import { useState } from "react";
import { Pagination } from "../pagination/index";
import * as Dialog from "@radix-ui/react-dialog";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { ModalTransaction } from "../modal/modalTransaction";

interface PaginatedTableProps {
  itemsPerPage: number;
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
                  <Dialog.Root>
                    <Dialog.Trigger >
                      <PencilSimpleLine />
                    </Dialog.Trigger>
                    <ModalTransaction title="Editar transação" id={item.id} data={item?.data} />
                  </Dialog.Root>

                  <AlertDialog.Root>
                    <AlertDialog.Trigger asChild>
                      <DeleteItem > <Trash /> </DeleteItem>
                    </AlertDialog.Trigger>
                    <AlertDialog.Portal>
                      <Overlay />
                      <Content>
                        <Title>
                          Você tem certeza que deseja remover essa transação?
                        </Title>
                        <Description>
                          Você esta preste a excluia transação {item.data.description} no valor de {priceFormatter.format(item.data.price)}.
                        </Description>
                        <AlertContainer>
                          <AlertDialog.Cancel asChild>
                            <Button type="PRIMARY">Cancelar</Button>
                          </AlertDialog.Cancel>
                          <AlertDialog.Action asChild>
                            <Button onClick={() => deleteTransaction(item.id)}>Remover transação</Button>
                          </AlertDialog.Action>
                        </AlertContainer>
                      </Content>
                    </AlertDialog.Portal>
                  </AlertDialog.Root>



                </ContainerItens>
              </tr>
            ))
          ) : (
            <tr key="no-item" >
              <td className="no-item" style={{ borderRadius: "6px" }}>
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
