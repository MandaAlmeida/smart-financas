"use client";
import styled, { css } from "styled-components";

export const SummaryContainer = styled.section`
  width: 100%;
  max-width: 112rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3.2rem;

  margin: 0 auto;
  margin-top: -8rem;
  padding: 0 2.4rem;

  section {
    display: flex;
    gap: 3.2rem;
    width: 100%;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    section {
      flex-wrap: wrap;
    }
  }
`;

export const SummaryCard = styled.div`
  background: ${(props) => props.theme["gray-100"]};
  border-radius: 6px;
  padding: 3.2rem;
  width: 100%;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${(props) => props.theme["gray-700"]};
  }

  strong {
    display: block;
    margin-top: 1.6rem;
    font-size: 3.2rem;
    color: ${(props) => props.theme["blue-700"]};
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;