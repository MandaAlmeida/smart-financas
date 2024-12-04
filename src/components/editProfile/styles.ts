import styled from "styled-components";

export const ContainerProfile = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 5px;
  font-size: 1.4rem;
  padding: 0.5rem;
  color: ${(props) => props.theme["white"]};

  section,
  button {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  button {
    transition: color 0.2s;
    padding: 0.5rem;

    font-size: 1.2rem;

    border-radius: 6px;

    &:first-child:hover {
      color: ${(props) => props.theme["blue-700"]};
    }
    &:last-child:hover {
      color: ${(props) => props.theme["red-500"]};
    }
  }
`;

export const Button = styled.button``;
