"use client";

import { EnvelopeSimple, IdentificationCard, LockSimple } from "phosphor-react";
import { SubmitHandler, useForm } from "react-hook-form";
import singUp from "@/firebase/auth/singUp";
import { FirebaseError } from "firebase/app";
import { useRouter } from "next/navigation";
import { useRef } from "react";

interface Users {
  name: string;
  email: string;
  password: string;
}
export default function FormRegister() {
  const { register, handleSubmit } = useForm<Users>();
  const router = useRouter();
  const spanError = useRef<HTMLSpanElement>(null);

  const onSubmit: SubmitHandler<Users> = async (data) => {
    const email = data.email;
    const password = data.password;
    const name = data.name;
    try {
      const { result, error } = await singUp(email, password, name);
      const span = spanError.current;
      if (error && span) {
        const firebaseError = error as FirebaseError;
        span.style.fontSize = "1.2rem";
        if (firebaseError.message) {
          console.log(firebaseError.message);
          throw new Error(firebaseError.message);
        } else {
          console.log("Unknown Error:", firebaseError);
          throw new Error("Unknown Error");
        }
      } else {
        router.push("/");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section>
        <IdentificationCard />
        <input type="text" placeholder="Nome" {...register("name")} required />
      </section>
      <section>
        <EnvelopeSimple />
        <input
          type="text"
          placeholder="Seu email"
          {...register("email")}
          required
        />
        <span ref={spanError}>Email já cadastrado</span>
      </section>
      <section>
        <LockSimple />
        <input
          type="password"
          placeholder="Sua senha"
          {...register("password")}
          required
        />
      </section>
      <button type="submit">Criar conta</button>
    </form>
  );
}
