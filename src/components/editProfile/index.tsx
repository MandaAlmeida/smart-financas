import { auth } from "@/firebase/clientApp";

import { Button, ContainerProfile } from "./styles";

import { User, SignOut } from "phosphor-react";
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
      {/* <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button>
            <User />
            Editar Perfil
          </Button>
        </Dialog.Trigger>
        <ModalEditProfile />
      </Dialog.Root> */}

      <Button onClick={signout}>
        <SignOut />
        Sair da conta
      </Button>
    </ContainerProfile>
  );
}
