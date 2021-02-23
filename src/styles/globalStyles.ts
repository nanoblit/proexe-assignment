import { createGlobalStyle } from "styled-components";
import reset from "./reset";

const GlobalStyle = createGlobalStyle`
  ${reset}

  h1 {
    font-size: 32px;
    font-weight: bold;
  }
`;

export default GlobalStyle;