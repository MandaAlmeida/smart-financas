"use client";
import styled from "styled-components";

export type PerfilActive = "OFF" | "ACTIVE";

type Props = {
  type: PerfilActive
}



export const HeaderContainer = styled.header`
  background: ${(props) => props.theme["blue-700"]};
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
    img svg {
      width: 60%;
    }
  }
`;

export const Menu = styled.section`
  display: flex;
  gap: 20px;
  align-items: center;
`;


export const ButtonUser = styled.button`
position: relative;

color: ${(props) => props.theme["blue-700"]};

border-radius: 100%;
background-color: ${(props) => props.theme["gray-100"]};
padding: 1rem;
`