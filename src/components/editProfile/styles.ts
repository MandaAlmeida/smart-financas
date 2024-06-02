import styled from "styled-components";

export const UserButton = styled.button`
  background: transparent;
  border: none;
  border-radius: 100%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  font-size: 2rem;
  font-weight: bold;
  color: ${(props) => props.theme["white"]};

  transition: background 0.5s;

  &:hover {
    color: ${(props) => props.theme["green-500"]};
  }

  @media (max-width: 750px) {
    height: 40px;
  }
`;

export const MenuEditProfile = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background-color: ${(props) => props.theme["gray-700"]};
  width: 165px;
  padding: 1rem;
  border-radius: 6px;
  span {
    font-size: 1rem;
  }
  div {
    width: 100%;
  }
`;

export const EditProfile = styled.button`
  height: 30px;
  border: transparent 1px solid;
  background: transparent;
  width: 100%;

  border-radius: 6px;
  padding: 0 1rem;

  font-size: 1.4rem;
  color: ${(props) => props.theme["green-500"]};

  cursor: pointer;

  transition: all 0.5s;

  &:hover {
    color: ${(props) => props.theme["white"]};
    background: ${(props) => props.theme["green-500"]};
  }

  @media (max-width: 750px) {
    height: 40px;
  }
`;

export const CloseProfile = styled.button`
  height: 30px;
  border: transparent 1px solid;
  background: transparent;
  width: 100%;

  border-radius: 6px;
  padding: 0 1rem;

  font-size: 1.4rem;
  color: ${(props) => props.theme["red-500"]};

  cursor: pointer;

  transition: all 0.5s;

  &:hover {
    color: ${(props) => props.theme["white"]};
    background: ${(props) => props.theme["red-700"]};
  }

  @media (max-width: 750px) {
    height: 40px;
  }
`;
