import {
  Button,
  CardContent,
  CardHeader,
  Dialog,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { deleteUserAction, getUsersAction } from "../../actions";
import { useTypedSelector } from "../../reducers";
import { DeleteDialogButtons, NoUsersP, UserNav } from "./DashboardStyle";

const Dashboard: React.FC = () => {
  const [isDeletionDialogOpen, setIsDeletionDialogOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(-1);
  const [sortingActive, setSortingActive] = useState(false);
  const [sortingMode, setSortingMode] = useState<"desc" | "asc">("desc");
  const users = useTypedSelector(({ users }) => users);
  const sortedUsers = useMemo(() => {
    if (sortingActive) {
      if (sortingMode === "desc") {
        return users.sort((a, b) => (a.username < b.username ? -1 : 1));
      } else {
        return users.sort((a, b) => (a.username > b.username ? -1 : 1));
      }
    }
    return users.sort((a, b) => (a.id < b.id ? -1 : 1));
  }, [users, sortingMode, sortingActive]);
  const history = useHistory();
  const dispatch = useDispatch();

  const sort = (doSort: boolean) => {
    if (doSort) {
      if (sortingActive) {
        setSortingMode((prev) => (prev === "asc" ? "desc" : "asc"));
      }
      setSortingActive(() => true);
    } else {
      setSortingActive(() => false);
    }
  };

  const askToDeleteUser = (id: number) => {
    setIdToDelete(() => id);
    setIsDeletionDialogOpen(() => true);
  };

  const deleteUser = (id: number) => {
    dispatch(deleteUserAction(id));
    setIsDeletionDialogOpen(() => false);
  };

  useEffect(() => {
    dispatch(getUsersAction());
  }, [dispatch]);

  return (
    <>
      <Card>
        <CardHeader
          title={
            <UserNav>
              <p>User list</p>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  history.push("/add-user");
                }}
              >
                Add new
              </Button>
            </UserNav>
          }
        />
        <CardContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    <TableSortLabel
                      active={!sortingActive}
                      direction={"desc"}
                      onClick={() => sort(false)}
                    >
                      Id
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">
                    <TableSortLabel
                      active={sortingActive}
                      direction={sortingMode}
                      onClick={() => sort(true)}
                    >
                      Username
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="center">City</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Edit</TableCell>
                  <TableCell align="center">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.length > 0 ? (
                  sortedUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell align="center">{user.id}</TableCell>
                      <TableCell align="center">{user.name}</TableCell>
                      <TableCell align="center">{user.username}</TableCell>
                      <TableCell align="center">{user.address.city}</TableCell>
                      <TableCell align="center">{user.email}</TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            history.push(`/edit-user/${user.id}`);
                          }}
                        >
                          Edit
                        </Button>
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => askToDeleteUser(user.id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <NoUsersP>No users to show</NoUsersP>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      <Dialog
        open={isDeletionDialogOpen}
        onClose={() => setIsDeletionDialogOpen(() => false)}
      >
        <DialogTitle>
          Are you sure you want to delete{" "}
          {users.find(({ id }) => idToDelete === id)?.name}?
        </DialogTitle>
        <DeleteDialogButtons>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setIsDeletionDialogOpen(() => false)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => deleteUser(idToDelete)}
          >
            Delete
          </Button>
        </DeleteDialogButtons>
      </Dialog>
    </>
  );
};

export default Dashboard;
