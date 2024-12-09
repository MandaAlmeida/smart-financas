import { HeaderContainer, HeaderContent } from "./styled";


import UserLogin from "../editProfile";

import CreateTransaction from "../createTransaction";
import { User } from "phosphor-react";

export function Header() {

  return (
    <HeaderContainer>
      <HeaderContent>
        <CreateTransaction />
        <UserLogin />
      </HeaderContent>
    </HeaderContainer>
  );
}
