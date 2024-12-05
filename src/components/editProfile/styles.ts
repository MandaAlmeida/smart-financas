import styled from "styled-components";

export const ContainerProfile = styled.div`
position: absolute;
top: 0;
left: 0;

width: 200px;
background-color: ${(props) => props.theme["gray-200"]};
border-radius: 6px;
padding: 1.5rem;

  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 15px;
  font-size: 1.4rem;
  color: ${(props) => props.theme["bçue-700"]};

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
      color: ${(props) => props.theme["blue-500"]};
    }
    &:last-child:hover {
      color: ${(props) => props.theme["red-500"]};
    }
  }
`;