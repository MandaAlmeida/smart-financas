import logo from "@/assets/logo.svg";
import Image from "next/image";
import {
  ContainerForm,
  ContainerLogo,
  ContainerRegister,
} from "@/styles/app/User";
import Link from "next/link";
import { Metadata } from "next";
import FormLogin from "@/components/loginUser/page";

export const metadata: Metadata = {
  title: "Entrar",
};

export default function Login() {
  return (
    <ContainerRegister>
      <ContainerLogo>
        <Image src={logo} alt="logo ignite" />
        <h2>
          CONTROLE DAS SUAS FINANÇAS <br /> NA PALMA DA SUA MÃO
        </h2>
      </ContainerLogo>
      <ContainerForm>
        <h2>Acessar sua conta</h2>
        <FormLogin />
        <span>Não possui uma conta ?</span>
        <Link href="/register">Criar conta</Link>
      </ContainerForm>
    </ContainerRegister>
  );
}
