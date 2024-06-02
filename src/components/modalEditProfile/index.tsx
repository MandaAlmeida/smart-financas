"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { Eye, EyeClosed, X } from "phosphor-react";
import {
  CloseButtonEditProfile,
  ContentEditProfile,
  OverlayEditProfile,
} from "./styles";
import { useState } from "react";
import {
  getAuth,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { useForm } from "react-hook-form";

interface User {
  name?: string;
  email?: string;
  password?: string;
}

export default function ModalEditProfile() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const auth = getAuth();
  async function handleEditProfile(data: User) {
    const { email, name, password } = data;
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
      try {
        await updateEmail(auth.currentUser, `${email}`);
        await updatePassword(auth.currentUser, `${password}`);
      } catch (e) {
        console.log(e);
      }
    }
    reset();
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <Dialog.Portal>
      <OverlayEditProfile>
        <ContentEditProfile>
          <Dialog.Title>Editar perfil</Dialog.Title>
          <CloseButtonEditProfile>
            <X color="white" size={20} />
          </CloseButtonEditProfile>
          <Dialog.Description>Edite seu perfil aqui</Dialog.Description>
          <form onSubmit={handleSubmit(handleEditProfile)}>
            <input placeholder="Nome" {...register("name")} />

            <input placeholder="Email" {...register("email")} />
            <div
              className="password-container"
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Sua senha"
                {...register("password")}
                style={{ width: "100%", paddingRight: "30px" }}
              />
              <span
                className="toggle-password"
                onClick={togglePasswordVisibility}
                style={{
                  position: "absolute",
                  right: "10px",
                  cursor: "pointer",
                  userSelect: "none",
                }}
              >
                {passwordVisible ? <EyeClosed size={24} /> : <Eye size={24} />}
              </span>
            </div>
            <button type="submit">Salvar</button>
          </form>
        </ContentEditProfile>
      </OverlayEditProfile>
    </Dialog.Portal>
  );
}
