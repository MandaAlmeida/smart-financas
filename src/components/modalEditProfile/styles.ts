"use client";
import * as Dialog from "@radix-ui/react-dialog";
import styled from "styled-components";

export const OverlayEditProfile = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
`;

export const ContentEditProfile = styled(Dialog.Content)`
  min-width: 51.2rem;
  border-radius: 6px;
  padding: 4rem 4.8rem;
  background: ${(props) => props.theme["gray-800"]};

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  form {
    margin-top: 3.2rem;

    display: flex;
    flex-direction: column;
    gap: 1.6rem;

    input {
      border-radius: 6px;
      border: 0;
      background: ${(props) => props.theme["gray-900"]};
      color: ${(props) => props.theme["gray-300"]};
      padding: 1.6rem;

      &::placeholder {
        color: ${(props) => props.theme["gray-500"]};
      }
    }

    span svg {
      color: ${(props) => props.theme["gray-500"]};
    }

    button[type="submit"] {
      height: 58px;
      border: 0;
      background: ${(props) => props.theme["green-500"]};
      color: ${(props) => props.theme["white"]};
      font-weight: bold;
      padding: 0 2rem;
      border-radius: 6px;
      margin-top: 2.4rem;

      transition: background 0.5s;
      cursor: pointer;

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      &:not(:disabled):hover {
        background: ${(props) => props.theme["green-700"]};
      }
    }
  }

  @media (max-width: 750px) {
    min-width: 39.06rem;
    padding: 4rem 3rem;

    form {
      button[type="submit"] {
        height: 40px;
      }
    }
  }
`;

export const CloseButtonEditProfile = styled(Dialog.Close)`
  position: absolute;
  top: 2.4rem;
  right: 2.4rem;

  background: transparent;
  border: 0;
  line-height: 0;

  cursor: pointer;
`;
