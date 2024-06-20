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
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 50px;

  background-color: ${(props) => props.theme["gray-900"]};

  text-align: center;

  h2 {
    color: ${(props) => props.theme["green-500"]};
    font-size: 32px;
  }
  @media (max-width: 768px) {
    height: 100px;
    padding: 16px;
    gap: 0;
    background-color: transparent;

    img {
      width: 200px;
    }

    h2 {
      font-size: 16px;
    }
  }
`;
export const SectionLogo = styled.section`
  margin: 0 auto;
`;

export const ContainerForm = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;

  a {
    color: ${(props) => props.theme["green-500"]};
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

  @media (max-width: 768px) {
    width: 100%;
    height: 100vh;
  }
`;
