import { HeaderContainer, HeaderContent, PerfilActive } from "./styled";

import UserLogin from "../editProfile";

import CreateTransaction from "../createTransaction";
import { User } from "phosphor-react";
import { useState } from "react";

export function Header() {
  const [active, setActive] = useState<PerfilActive>("OFF");

  function handleMenuActive() {
    if (active === "OFF") {
      setActive("ACTIVE");
      console.log(active)
      return;


    }

    setActive("OFF");
    console.log(active)
  }
  return (
    <HeaderContainer>
      <HeaderContent>
        <button onClick={handleMenuActive}><User />
        </button>
        {active === "ACTIVE" ? <UserLogin /> : ""}

        <CreateTransaction />
      </HeaderContent>
    </HeaderContainer>
  );
}
