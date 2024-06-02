import logo from "@/assets/logo.svg";
import Image from "next/image";
import {
  ContainerForm,
  ContainerRegister,
  SectionLogo,
} from "@/styles/app/User";
import Link from "next/link";
import { Metadata } from "next";
import FormRegister from "@/components/createUser/page";

export const metadata: Metadata = {
  title: "Registro",
};

export default function Register() {
  return (
    <ContainerRegister>
      <SectionLogo>
        <Image src={logo} alt="logo ignite" />
      </SectionLogo>
      <ContainerForm>
        <h2>Crie sua conta</h2>
        <FormRegister />
        <span>Já possui uma conta?</span>
        <Link href="/login">Fazer login</Link>
      </ContainerForm>
    </ContainerRegister>
  );
}
