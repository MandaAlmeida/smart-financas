"use client";
import styled from "styled-components";

export const HeaderContainer = styled.header`
  background: ${(props) => props.theme["gray-900"]};
  padding: 4rem 0 12rem;
`;

export const HeaderContent = styled.div`
  width: 100%;
  max-width: 112rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  margin: 0 auto;
  padding: 0 2.4rem;

  @media (max-width: 750px) {
    img {
      width: 50%;
    }
  }
`;

export const NewTransactionButton = styled.button`
  height: 50px;
  border: 0;
  background: ${(props) => props.theme["green-500"]};

  border-radius: 6px;
  padding: 0 2rem;

  color: ${(props) => props.theme["white"]};
  font-weight: 700;
  font-size: 1.4rem;

  cursor: pointer;

  transition: background 0.5s;

  &:hover {
    background: ${(props) => props.theme["green-700"]};
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

    &:active,
    &:focus {
      border-color: ${(props) => props.theme["green-700"]};
      svg {
        color: ${(props) => props.theme["green-700"]};
      }
    }

    &:hover {
      background: transparent;
    }
    svg {
      font-size: 16px;
    }
  }
`;

export const Menu = styled.section`
  display: flex;
  gap: 20px;
  align-items: center;
`;
