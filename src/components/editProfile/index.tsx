import { auth } from "@/firebase/clientApp";

import { ContainerProfile } from "./styles";

import { User, X } from "phosphor-react";
import { useContextSelector } from "use-context-selector";
import { TransactionsContext } from "@/contexts/TransactionsContext";
import * as Dialog from "@radix-ui/react-dialog";
import ModalEditProfile from "../modal/modalEditProfile";

export default function UserLogin() {
  const signout = useContextSelector(TransactionsContext, (context) => {
    return context.signout;
  });

  console.log(auth);

  return (
    <ContainerProfile>
      {auth.currentUser?.displayName}

      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button>
            <User size={15} />
            Editar
          </button>
        </Dialog.Trigger>
        <ModalEditProfile />
      </Dialog.Root>

      <button onClick={signout}>
        <X size={15} />
        Deslogar
      </button>
    </ContainerProfile>
  );
}
