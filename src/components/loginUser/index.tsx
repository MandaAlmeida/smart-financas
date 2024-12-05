"use client";
import { EnvelopeSimple, LockSimple } from "phosphor-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRef } from "react";
import { useContextSelector } from "use-context-selector";
import { TransactionsContext } from "@/contexts/TransactionsContext";

interface User {
  name: string;
  email: string;
  password: string;
}

export default function FormLogin() {
  const fetchDate = useContextSelector(TransactionsContext, (context) => {
    return context.fetchDate;
  });
  const signin = useContextSelector(TransactionsContext, (context) => {
    return context.signin;
  });

  const spanError = useRef<HTMLSpanElement>(null);

  const { register, handleSubmit } = useForm<User>();
  const onSubmit: SubmitHandler<User> = async (data) => {
    const email = data.email;
    const password = data.password;
    try {
      const { result, error } = await signin(email, password);
      if (error) {
        console.error("Erro ao fazer login:", error);
      } else if (result) {
        console.log("Usuário logado com sucesso:", result.user);

        fetchDate("");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
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
