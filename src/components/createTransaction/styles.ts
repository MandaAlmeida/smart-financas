import styled from "styled-components";
import * as Dialog from "@radix-ui/react-dialog";

export const NewTransactionButton = styled(Dialog.Trigger)`
  height: 50px;
  border: 0;
  background: ${(props) => props.theme["blue-500"]};

  border-radius: 6px;

  padding:12px 20px;

  color: ${(props) => props.theme["white"]};
  font-weight: 700;
  font-size: 1.4rem;

  cursor: pointer;

  transition: background 0.5s;

  &:hover {
    background: ${(props) => props.theme["blue-400"]};
  }
  svg {
    font-size: 0;
  }

  @media (max-width: 750px) {
    font-size: 0;
    border-radius: 100%;
    padding: 0.6rem;
    border: ${(props) => props.theme["white"]} 1px solid;
    background: transparent;
    height: 30px;

    &:hover {
      background: transparent;
    }
    svg {
      font-size: 16px;
    }
  }
`;

