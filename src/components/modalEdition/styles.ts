"use client";
import * as Dialog from "@radix-ui/react-dialog";
import * as RadioGroup from "@radix-ui/react-radio-group";
import styled from "styled-components";

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
`;

export const Content = styled(Dialog.Content)`
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

    label {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 1.4rem;
      color: ${(props) => props.theme["gray-300"]};
    }

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

export const CloseButton = styled(Dialog.Close)`
  position: absolute;
  top: 2.4rem;
  right: 2.4rem;

  background: transparent;
  border: 0;
  line-height: 0;

  cursor: pointer;
`;

export const ContainerDateInput = styled.section`
  div {
    z-index: 1000;
  }
`;

export const TransactionType = styled(RadioGroup.Root)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.6rem;
  margin-top: 0.8rem;
`;

interface TransactionTypeButtonProps {
  variant: "income" | "outcome";
}

export const TransactionTypeButton = styled(
  RadioGroup.Item
)<TransactionTypeButtonProps>`
  background: ${(props) => props.theme["gray-700"]};
  padding: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  border-radius: 6px;
  cursor: pointer;
  border: 0;
  color: ${(props) => props.theme["gray-300"]};

  svg {
    color: ${(props) =>
      props.variant === "income"
        ? props.theme["green-300"]
        : props.theme["red-300"]};
  }

  &[data-state="unchecked"]:hover {
    background: ${(props) => props.theme["gray-600"]};
  }

  &[data-state="checked"] {
    background: ${(props) =>
      props.variant === "income"
        ? props.theme["green-700"]
        : props.theme["red-700"]};

    color: ${(props) => props.theme["white"]};
    svg {
      color: ${(props) => props.theme["white"]};
    }
  }
`;
