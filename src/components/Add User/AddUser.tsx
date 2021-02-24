import { Button, Card, CardHeader, FormControl } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { addUserAction } from "../../actions";
import { StyledCardContent, StyledTextField } from "./AddUserStyle";

const AddUser: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const isNameValid = (): boolean => {
    return /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(
      name
    );
  };

  const isEmailValid = (): boolean => {
    return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
      email
    );
  };

  return (
    <Card>
      <CardHeader title="Form" />
      <StyledCardContent>
        <FormControl>
          <StyledTextField
            helperText={
              !isNameValid() && name !== "" && "Please enter a valid name"
            }
            error={!isNameValid() && name !== ""}
            label="Name"
            value={name}
            onChange={(e) => setName(() => e.target.value)}
          />
          <StyledTextField
            helperText={
              !isEmailValid() && email !== "" && "Please enter a valid email"
            }
            error={!isEmailValid() && email !== ""}
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
              dispatch(addUserAction(name, email));
              history.push("/");
            }}
          >
            Submit
          </Button>
        </div>
      </StyledCardContent>
    </Card>
  );
};

export default AddUser;
