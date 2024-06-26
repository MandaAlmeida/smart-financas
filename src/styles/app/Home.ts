"use client";
import styled from "styled-components";

export const TranactionsContainer = styled.main`
  width: 100%;
  max-width: 112rem;
  margin: 6.4rem auto 0;
  padding: 0 3.2rem;
  height: 100vh;
`;

export const ContainerFilter = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;

  @media (max-width: 750px) {
    flex-direction: column;
  }
`;
