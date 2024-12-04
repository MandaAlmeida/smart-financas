import { ContainerForm, ContainerLogo, ContainerRegister } from "@/styles/User";
import Link from "next/link";
import { Metadata } from "next";
import FormLogin from "@/components/loginUser/page";

export const metadata: Metadata = {
  title: "Entrar",
};

export default function Login() {
  return (
    <ContainerRegister>
      <ContainerLogo></ContainerLogo>
      <ContainerForm>
        <FormLogin />
        <span>Não possui uma conta ainda?</span>
        <Link href="/register">Criar conta</Link>
      </ContainerForm>
    </ContainerRegister>
  );
}
