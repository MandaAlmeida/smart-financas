"use client";
import styled from "styled-components";

export const ContainerRegister = styled.main`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  height: 100vh;
  align-items: center;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

export const ContainerLogo = styled.section`
  width: 100%;
  height: 100vh;

  background-color: ${(props) => props.theme["blue-700"]};
`;

export const ContainerForm = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;


  a {
    color: ${(props) => props.theme["blue-700"]};
    font-weight: 700;
    margin-top: 10px;
  }

  form {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 60%;
    gap: 30px;
  }

  section {
    position: relative;
    span {
      position: absolute;
      bottom: -20px;
      left: 20px;
      font-size: 0;
      font-weight: bold;
      color: ${(props) => props.theme["red-300"]};
    }
  }

  input {
    height: 45px;
    width: 100%;
    border: 0;
    border-radius: 10px;
    background: ${(props) => props.theme["gray-300"]};
    padding: 5px 51px;
    color: ${(props) => props.theme["gray-600"]};

    &::placeholder {
      color: ${(props) => props.theme["gray-600"]};
    }
  }

  svg {
    position: absolute;
    font-size: 20px;
    color: ${(props) => props.theme["blue-700"]};
    top: 50%;
    left: 18px;
    transform: translateY(-50%);
  }

  button {
    border: 0;
    height: 45px;
    border-radius: 10px;
    background-color: ${(props) => props.theme["blue-700"]};
    color: ${(props) => props.theme["gray-100"]};
    transition: background 0.5s ease-in-out;

    cursor: pointer;

    &:hover {
      background: ${(props) => props.theme["blue-500"]};
    }
  }

  span{
    margin-top: 30px;
    color: ${(props) => props.theme["gray-400"]};
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 100vh;
  }
`;
