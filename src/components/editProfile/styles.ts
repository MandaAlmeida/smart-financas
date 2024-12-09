import styled from "styled-components";

export const ContainerProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 1.4rem;
  color: ${(props) => props.theme["gray-300"]};

  section,
  button {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  button {
    transition: background 0.5s;

    &:first-child:hover {
      background-color: ${(props) => props.theme["blue-300"]};
    }
    &:last-child:hover {
     background-color: ${(props) => props.theme["red-500"]};
    }
  }
`;
export const Button = styled.button`
  border: 0;
  background: ${(props) => props.theme["blue-500"]};

  border-radius: 6px;

  padding: 12px 20px;

  color: ${(props) => props.theme["white"]};
  font-weight: 700;
  font-size: 1.4rem;

  cursor: pointer;

  svg {
    font-size: 15px;
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

