import { Button, Card, CardHeader, FormControl } from "@material-ui/core";
import React, { useEffect, useMemo } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import { addUserAction, editUserAction, getUsersAction } from "../../actions";
import { useTypedSelector } from "../../reducers";
import { StyledCardContent, StyledTextField } from "./EditUserStyle";

const AddUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const users = useTypedSelector(({ users }) => users);
  const user = useMemo(() => users.find((user) => user.id === Number(id)), [
    users,
    id,
  ]);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const isNameValid = (): boolean => {
    return /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(
      name
    );
  };

  const isUsernameValid = (): boolean => {
    return username.indexOf(" ") < 0 && username !== "";
  };

  const isCityValid = (): boolean => {
    return /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(
      city
    );
  };

  const isEmailValid = (): boolean => {
    return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
      email
    );
  };

  useEffect(() => {
    dispatch(getUsersAction());
  }, [dispatch]);

  useEffect(() => {
    setName(() => user?.name ?? "");
    setUsername(() => user?.username ?? "");
    setCity(() => user?.address.city ?? "");
    setEmail(() => user?.email ?? "");
  }, [user]);

  return (
    <Card>
      <CardHeader title={user ? "Edit User" : "No user to edit"} />
      {user ? (
        <StyledCardContent>
          <FormControl>
            <StyledTextField
              helperText={!isNameValid() && "Please enter a valid name"}
              error={!isNameValid()}
              label="Name"
              value={name}
              onChange={(e) => setName(() => e.target.value)}
            />
            <StyledTextField
              helperText={
                !isUsernameValid() && "Username can't have spaces nor be empty"
              }
              error={!isUsernameValid()}
              label="Username"
              value={username}
              onChange={(e) => setUsername(() => e.target.value)}
            />
            <StyledTextField
              helperText={!isCityValid() && "Please enter a valid city"}
              error={!isCityValid()}
              label="City"
              value={city}
              onChange={(e) => setCity(() => e.target.value)}
            />
            <StyledTextField
              helperText={!isEmailValid() && "Please enter a valid email"}
              error={!isEmailValid()}
              label="Email"
              value={email}
              onChange={(e) => setEmail(() => e.target.value)}
            />
          </FormControl>
          <div className="buttons-container">
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                history.push("/");
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={!isNameValid() || !isEmailValid()}
              onClick={() => {
                dispatch(
                  editUserAction({
                    id: Number(id),
                    name,
                    username,
                    address: { city },
                    email,
                  })
                );
                history.push("/");
              }}
            >
              Submit
            </Button>
          </div>
        </StyledCardContent>
      ) : (
        <StyledCardContent>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              history.push("/");
            }}
          >
            Back
          </Button>
        </StyledCardContent>
      )}
    </Card>
  );
};

export default AddUser;
