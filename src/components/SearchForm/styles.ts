"use client";
import styled from "styled-components";

export const SearchFormContainer = styled.form`
  display: flex;
  flex: 1;
  gap: 1.6rem;
  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

export const SectionInput = styled.section`
  position: relative;
  flex: 1;
  input {
    width: 100%;
    height: 7rem;
    border-radius: 6px;
    border: 0;
    background: ${(props) => props.theme["gray-900"]};
    color: ${(props) => props.theme["gray-300"]};
    padding: 1.6rem;

    &::placeholder {
      color: ${(props) => props.theme["gray-500"]};
    }
    @media (max-width: 768px) {
      height: 54px;
      font-size: 1.6rem;
    }
  }
`;
export const ButtonClear = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);

  svg {
    color: ${(props) => props.theme["red-300"]};
  }
  &:disabled {
    opacity: 0;
  }
`;

export const ButtonSubmit = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
  background: transparent;

  border: 1px solid ${(props) => props.theme["green-300"]};
  border-radius: 6px;
  padding: 1.6rem;

  color: ${(props) => props.theme["green-300"]};
  font-weight: bold;

  cursor: pointer;

  transition: background 0.5s, color 0.5s, border-color 0.5s;

  &:disabled {
    opacity: 60%;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background: ${(props) => props.theme["green-500"]};
    border-color: ${(props) => props.theme["green-500"]};
    color: ${(props) => props.theme.white};
  }

  @media (max-width: 768px) {
    font-size: 0;
    gap: 0;
    height: 54px;
  }
`;
