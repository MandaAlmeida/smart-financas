"use client";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
:root{
    font-size: 62.5%;
}

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:focus {
    outline: 0;
    box-shadow: 0 0 0 2px ${(props) => props.theme["blue-500"]};
}

body{
    background-color: ${(props) => props.theme["gray-200"]};
    color: ${(props) => props.theme["gray-800"]};
    -webkit-font-smoothing: antialiased;
}

body, input, textarea, button {
    font: 400 1.6rem 'Roboto', sans-serif;
}
`;
