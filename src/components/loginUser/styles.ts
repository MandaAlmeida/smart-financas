"use client";
import styled from "styled-components";

export const ContainerLoginUser = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 60%;
  gap: 30px;

  section {
    position: relative;
  }

  input {
    height: 45px;
    width: 100%;
    border: 0;
    border-radius: 10px;
    background: ${(props) => props.theme["gray-900"]};
    padding: 5px 51px;
    color: ${(props) => props.theme["gray-100"]};

    &::placeholder {
      color: ${(props) => props.theme["gray-200"]};
    }
  }
  svg {
    position: absolute;
    font-size: 20px;
    color: ${(props) => props.theme["green-500"]};
    top: 50%;
    left: 18px;
    transform: translateY(-50%);
  }

  button {
    border: 0;
    height: 45px;
    border-radius: 10px;
    background-color: ${(props) => props.theme["green-500"]};
    color: ${(props) => props.theme["gray-100"]};
    transition: background 0.5s ease-in-out;

    cursor: pointer;

    &:hover {
      background: ${(props) => props.theme["green-700"]};
    }
  }
`;
