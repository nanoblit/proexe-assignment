import { ThunkDispatch } from "redux-thunk";
import { AppThunk } from "../reducers";
import {
  AddUserAction,
  ADD_USER,
  DeleteUserAction,
  DELETE_USER,
  EditUserAction,
  EDIT_USER,
  GetUsersAction,
  GET_USERS,
  User,
} from "./types";

export const getUsersAction = (): AppThunk => async (
  dispatch: ThunkDispatch<{}, {}, GetUsersAction>,
  getState
) => {
  const res = await fetch(
    "https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data"
  );
  const users: User[] = await res.json();

  if (getState().users.length === 0) {
    dispatch({
      type: GET_USERS,
      payload: users,
    });
  }
};

export const addUserAction = (name: string, email: string): AppThunk => async (
  dispatch: ThunkDispatch<{}, {}, AddUserAction>,
  getState
) => {
  if (getState().users.length === 0) {
    await getUsersAction();
  }

  const users = getState().users;

  await fetch(
    "https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/db",
    {
      method: "POST",
      body: JSON.stringify({ name, email }),
    }
  );

  const newUser: User = {
    id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
    name,
    email,
    username: "",
    address: { city: "" },
  };

  dispatch({
    type: ADD_USER,
    payload: newUser,
  });
};

export const deleteUserAction = (id: number): AppThunk => async (
  dispatch: ThunkDispatch<{}, {}, DeleteUserAction>,
  getState
) => {
  await fetch(
    "https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/db",
    {
      method: "DELETE",
      body: JSON.stringify({ id }),
    }
  );

  dispatch({
    type: DELETE_USER,
    payload: id,
  });
};

export const editUserAction = (user: User): AppThunk => async (
  dispatch: ThunkDispatch<{}, {}, EditUserAction>,
  getState
) => {
  await fetch(
    "https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/db",
    {
      method: "PUT",
      body: JSON.stringify({ user }),
    }
  );

  dispatch({
    type: EDIT_USER,
    payload: user,
  });
};
