export const GET_USERS = "GET_USERS";

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

export type TestActionTypes = GetUsersAction;