import {
  Button,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { getUsersAction } from "../../actions";
import { useTypedSelector } from "../../reducers";
import { UserNav } from "./DashboardStyle";

const Dashboard: React.FC = () => {
  const users = useTypedSelector(({ users }) => users);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersAction());
  }, [dispatch]);

  return (
      <Card>
        <CardContent>
          <UserNav>
            <p>User list</p>
            <Button variant="contained" color="primary" onClick={() => {
              history.push('/add-user');
            }}>
              Add new
            </Button>
          </UserNav>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Id</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Username</TableCell>
                  <TableCell align="center">City</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Edit</TableCell>
                  <TableCell align="center">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell align="center">{user.id}</TableCell>
                    <TableCell align="center">{user.name}</TableCell>
                    <TableCell align="center">{user.username}</TableCell>
                    <TableCell align="center">{user.address.city}</TableCell>
                    <TableCell align="center">{user.email}</TableCell>
                    <TableCell align="center">
                      <Button variant="contained" color="primary">
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button variant="contained" color="secondary">
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
  );
};

export default Dashboard;
