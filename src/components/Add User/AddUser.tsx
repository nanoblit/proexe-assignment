import {
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  TextField,
} from "@material-ui/core";
import React from "react";

const AddUser: React.FC = () => {
  return (
    <Card>
      <CardHeader title="Form" />
      <CardContent>
        <FormControl>
          <TextField label="Name" />
          <TextField label="Email" />
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default AddUser;
