import { auth } from "@/firebase/clientApp";
import * as Dialog from "@radix-ui/react-dialog";
import {
  CloseProfile,
  EditProfile,
  MenuEditProfile,
  UserButton,
} from "./styles";
import ModalEditProfile from "../modalEditProfile";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { User } from "phosphor-react";

export default function UserLogin() {
  return (
    <>
      {auth.currentUser ? (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <UserButton>
              <User />
            </UserButton>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content asChild>
              <MenuEditProfile>
                <span>{auth.currentUser?.displayName}</span>
                <span>{auth.currentUser.email}</span>
                <DropdownMenu.Separator className="DropdownMenuSeparator" />
                <DropdownMenu.Item asChild>
                  <Dialog.Root>
                    <Dialog.Trigger asChild>
                      <EditProfile>Editar perfil</EditProfile>
                    </Dialog.Trigger>
                    <ModalEditProfile />
                  </Dialog.Root>
                </DropdownMenu.Item>
                <DropdownMenu.Item>
                  <CloseProfile>Sair da conta</CloseProfile>
                </DropdownMenu.Item>
              </MenuEditProfile>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      ) : (
        <span>Usuário não encontrado</span>
      )}
    </>
  );
}
