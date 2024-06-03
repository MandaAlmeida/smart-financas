import logo from "@/assets/logo.svg";
import Image from "next/image";
import {
  ContainerForm,
  ContainerRegister,
  SectionLogo,
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
      <SectionLogo>
        <Image src={logo} alt="logo ignite" />
      </SectionLogo>
      <ContainerForm>
        <h2>Acessar sua conta</h2>
        <FormLogin />
        <span>Não possui uma conta ?</span>
        <Link href="/register">Criar conta</Link>
      </ContainerForm>
    </ContainerRegister>
  );
}
