import { DialogContent } from "@material-ui/core";
import styled from "styled-components";

export const UserNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DeleteDialogButtons = styled(DialogContent)`
  display: flex;
  justify-content: flex-end;

  button:first-child {
    margin-right: 10px;
  }
`;

export const NoUsersP = styled.p`
  text-align: center;
  margin: 10px 0;
`;