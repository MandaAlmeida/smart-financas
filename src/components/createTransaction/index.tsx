import { NewTransactionButton, } from "./styles";
import * as Dialog from "@radix-ui/react-dialog";
import {
  Plus,
} from "phosphor-react";
import { ModalTransaction } from "../modal/modalTransaction";

export default function CreateTransaction() {

  return (
    <Dialog.Root>
      <NewTransactionButton>
        <Plus /> Nova transação
      </NewTransactionButton>
      <ModalTransaction title="Nova transação" />
    </Dialog.Root>

  );
}
