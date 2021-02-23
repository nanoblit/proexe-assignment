import { TypedUseSelectorHook, useSelector } from "react-redux";
import { Action, combineReducers } from "redux";
import { ThunkAction } from "redux-thunk";
import { GET_USERS, TestActionTypes as UsersActionTypes, User } from "../actions/types";

export const usersReducer = (state: User[] = [], action: UsersActionTypes): User[] => {
  switch (action.type) {
    case GET_USERS:
      return action.payload;
    default:
      return state;
  }
}

export const rootReducer = combineReducers({
  users: usersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;