import { ContainerForm, ContainerLogo, ContainerRegister } from "@/styles/User";
import Link from "next/link";
import { Metadata } from "next";
import FormRegister from "@/components/createUser";

export const metadata: Metadata = {
  title: "Registro",
};

export default function Register() {
  return (
    <ContainerRegister>
      <ContainerLogo></ContainerLogo>
      <ContainerForm>
        <FormRegister />
        <span>Já possui uma conta?</span>
        <Link href="/">Fazer login</Link>
      </ContainerForm>
    </ContainerRegister>
  );
}
