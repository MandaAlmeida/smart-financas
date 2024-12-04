"use client";
import styled from "styled-components";

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
