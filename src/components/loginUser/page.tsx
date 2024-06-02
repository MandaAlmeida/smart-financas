"use client";
import { EnvelopeSimple, LockSimple } from "phosphor-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import singIn from "@/firebase/auth/singIn";
import { FirebaseError } from "firebase/app";
import { useRef } from "react";
import { useContextSelector } from "use-context-selector";
import { TransactionsContext } from "@/contexts/TransactionsContext";
interface User {
  name: string;
  email: string;
  password: string;
}

export default function FormLogin() {
  const navigation = useRouter();
  const fetchDate = useContextSelector(TransactionsContext, (context) => {
    return context.fetchDate;
  });

  const spanError = useRef<HTMLSpanElement>(null);

  const { register, handleSubmit } = useForm<User>();
  const onSubmit: SubmitHandler<User> = async (data) => {
    const email = data.email;
    const password = data.password;
    try {
      const { result, error } = await singIn(email, password);
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
        if (result) {
          navigation.push(`/user/${result.user.uid}`);
        }
        fetchDate();
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section>
        <EnvelopeSimple />
        <input
          type="text"
          placeholder="Seu email"
          {...register("email")}
          required
        />
      </section>
      <section>
        <LockSimple />
        <input
          type="password"
          placeholder="Sua senha"
          {...register("password")}
          required
        />
        <span ref={spanError}>Email ou senha incorretos</span>
      </section>

      <button>Entrar</button>
    </form>
  );
}
