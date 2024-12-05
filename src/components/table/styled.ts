"use client";
import styled from "styled-components";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

export type ButtonColor = "PRIMARY" | "SECUNDARY";

type Props = {
  type?: ButtonColor
}

export const TableContainer = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.8rem;
  margin-top: 2.4rem;
  color: ${(props) => props.theme["gray-600"]};

  tr {
    position: relative;
  }

  td {
    padding: 2rem 1.5rem;
    height: 59px;
    background: ${(props) => props.theme["blue-700"]};

    color: ${(props) => props.theme["gray-100"]};

    &:first-child {
      width: 40%;
      border-radius: 6px 0 0 6px;
    }

    &:last-child {
      border-radius: 0 6px 6px 0;
    }
  }

  @media (max-width: 900px) {
    border-spacing: 0;

    tbody {
      display: flex;
      flex-direction: column;
      gap: 10px;

      tr {
        display: flex;
        flex-wrap: wrap;

        td {
          width: 50%;

          &:first-child {
            width: 50%;
            border-radius: 6px 0 0;
          }

          &:nth-child(2n) {
            border-radius: 0 6px 0 0;
          }

          &:nth-child(3n) {
            border-radius: 0 0 0 6px;
          }

          &:nth-child(4n) {
            border-radius: 0 0 6px 0;
          }

          &:nth-child(5n) {
            background: transparent;
          }

          &.no-item {
            width: 100%;
            border-radius: 6px;
          }
        }
      }
    }
  }
`;

export const ContainerItens = styled.td`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 20px;

  button {
    background: transparent;
    border: none;

    color: ${(props) => props.theme["gray-100"]};
    cursor: pointer;
  }

  @media (max-width: 900px) {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
  }
`;

export const DeleteItem = styled.button`
  svg:hover {
    color: ${(props) => props.theme["red-300"]};
  }
`;

export const EditItem = styled.button`
  svg:hover {
    color: ${(props) => props.theme["blue-300"]};
  }
`;

interface PriceHighLightProps {
  variant: "income" | "outcome";
}

export const PriceHighLight = styled.span<PriceHighLightProps>`
  color: ${(props) =>
    props.variant === "income"
      ? props.theme["green-300"]
      : props.theme["red-300"]};
`;

export const Overlay = styled(AlertDialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
`;

export const Content = styled(AlertDialog.Content)`
background-color: ${(props) => props.theme["white"]};
	border-radius: 6px;
	box-shadow:
		hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
		hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 90vw;
	max-width: 500px;
	max-height: 85vh;
	padding: 25px;
	animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
`
export const Title = styled(AlertDialog.Title)`
  font-size: 1.8rem;
  font-weight: 700;

  color: ${(props) => props.theme["gray-300"]};
`
export const Description = styled(AlertDialog.Description)`
  margin-top: 20px;
  color: ${(props) => props.theme["gray-400"]};
`

export const Button = styled.button<Props>`
background-color: ${({ type, theme }) => type === "PRIMARY" ? "" : theme["red-500"]};
color: ${({ type, theme }) => type === "PRIMARY" ? theme["gray-300"] : theme["white"]};

&:hover {
  background-color: ${({ type, theme }) => type === "PRIMARY" ? "" : theme["red-700"]};
  color: ${({ type, theme }) => type === "PRIMARY" ? theme["gray-600"] : ""};
}

padding: 0.8rem;
border-radius: 6px;
`

export const AlertContainer = styled.section`
display: flex;
gap: 25px;
justify-content: flex-end;

margin-top: 20px;
`
