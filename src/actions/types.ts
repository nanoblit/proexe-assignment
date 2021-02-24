export const GET_USERS = "GET_USERS";
export const ADD_USER = "ADD_USER";
export const DELETE_USER = "DELETE_USER";
export const EDIT_USER = "EDIT_USER";

export interface User {
  id: number;
  name: string;
  username: string;
  address: {
    city: string;
  };
  email: string;
}

export interface GetUsersAction {
  type: typeof GET_USERS;
  payload: User[];
}

export interface AddUserAction {
  type: typeof ADD_USER;
  payload: User;
}

export interface DeleteUserAction {
  type: typeof DELETE_USER;
  payload: number;
}

export interface EditUserAction {
  type: typeof EDIT_USER;
  payload: User;
}

export type TestActionTypes = GetUsersAction | AddUserAction | DeleteUserAction | EditUserAction;
