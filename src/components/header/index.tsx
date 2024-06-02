import logo from "@/assets/logo.svg";
import * as Dialog from "@radix-ui/react-dialog";

import {
  HeaderContainer,
  HeaderContent,
  Menu,
  NewTransactionButton,
} from "./styled";
import { Modal } from "../modal";
import Image from "next/image";
import UserLogin from "../editProfile";

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <Image src={logo} alt="logo ignite" />
        <Menu>
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <NewTransactionButton>Nova transação</NewTransactionButton>
            </Dialog.Trigger>
            <Modal />
          </Dialog.Root>
          {/* <UserLogin /> */}
        </Menu>
      </HeaderContent>
    </HeaderContainer>
  );
}
