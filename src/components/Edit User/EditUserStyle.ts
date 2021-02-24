import { CardContent, TextField } from "@material-ui/core";
import styled from "styled-components";

export const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  max-width: 700px;
  margin: 0 auto;

  .MuiFormControl-root{
    width: 100%;
  }

  .buttons-container {
    margin-top: 20px;

    button:first-child {
      margin-right: 10px
    }
  }
`;

export const StyledTextField = styled(TextField)`
  width: 100%;
  max-width: 700px;
`;