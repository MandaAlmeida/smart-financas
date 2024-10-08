import logo from "@/assets/logo.svg";
import * as Dialog from "@radix-ui/react-dialog";

import {
  HeaderContainer,
  HeaderContent,
  Menu,
  NewTransactionButton,
} from "./styled";
import { ModalTransaction } from "../modalTransaction";
import Image from "next/image";
import UserLogin from "../editProfile";
import { Plus } from "phosphor-react";

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <Image src={logo} alt="logo ignite" />
        <Menu>
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <NewTransactionButton>
                <Plus /> Nova transação
              </NewTransactionButton>
            </Dialog.Trigger>
            <ModalTransaction />
          </Dialog.Root>
          <UserLogin />
        </Menu>
      </HeaderContent>
    </HeaderContainer>
  );
}
