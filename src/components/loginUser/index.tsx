"use client";
import { EnvelopeSimple, Eye, EyeClosed, LockSimple } from "phosphor-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { useContextSelector } from "use-context-selector";
import { TransactionsContext } from "@/contexts/TransactionsContext";
import { FirebaseError } from "firebase/app";

interface User {
  name: string;
  email: string;
  password: string;
}

export default function FormLogin() {
  const [passwordVisible, setPasswordVisible] = useState(false);

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
      }
    } catch (e) {
      console.error(e);
    }
  };

  function togglePasswordVisibility() {
    setPasswordVisible(!passwordVisible);
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
          type={passwordVisible ? "text" : "password"}
          placeholder="Sua senha"
          {...register("password")} />
        <div onClick={togglePasswordVisibility}>
          {passwordVisible ? <EyeClosed size={24} /> : <Eye size={24} />}
        </div>
        <span ref={spanError}>Email ou senha incorretos</span>
      </section>

      <button>Entrar</button>
    </form>
  );
}
