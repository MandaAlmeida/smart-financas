import styled from "styled-components";

export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 3rem;

  span {
    font-size: 1.4rem;
    color: ${(props) => props.theme["gray-100"]};
  }

  div {
    display: flex;
    align-items: center;
    gap: 24px;
    flex-wrap: wrap;
  }

  section {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25px;
    height: 25px;
    border: 1px ${(props) => props.theme["gray-100"]} solid;
    border-radius: 5px;

    &:disabled {
      border-color: ${(props) => props.theme["gray-500"]};
      svg {
        color: ${(props) => props.theme["gray-500"]};
      }
    }
    &:hover {
      border-color: ${(props) => props.theme["green-500"]};
      svg {
        color: ${(props) => props.theme["green-500"]};
      }
    }

    svg {
      width: 1.5rem;
    }
  }

  @media (max-width: 750px) {
    padding: 10px 0;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
`;
