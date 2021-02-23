import { ThunkDispatch } from "redux-thunk";
import { AppThunk } from "../reducers";
import { GetUsersAction, GET_USERS, User } from "./types";

export const getUsersAction = (): AppThunk => async (
  dispatch: ThunkDispatch<{}, {}, GetUsersAction>
) => {
  const res = await fetch(
    "https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data"
  );
  const users: User[] = await res.json();

  dispatch({
    type: GET_USERS,
    payload: users,
  });
};
