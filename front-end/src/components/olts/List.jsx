import {
  Box,
  Button,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  makeStyles,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { userService } from "../../_services";

function List({ match }) {
  const { path } = match;
  const [users, setUsers] = useState(null);

  useEffect(() => {
    userService.getAll().then((x) => setUsers(x));
  }, []);

  function deleteUser(id) {
    setUsers(
      users.map((x) => {
        if (x.id === id) {
          x.isDeleting = true;
        }
        return x;
      })
    );
    userService.delete(id).then(() => {
      setUsers((users) => users.filter((x) => x.id !== id));
    });
  }

  const useStyles = makeStyles({
    tableCell: {
      fontSize: "1.1rem",
      fontWeight: 700,
    },
  });

  const classes = useStyles();
  return (
    <TableContainer style={{ padding: "1rem" }} component={Paper}>
      <Typography variant="h3">OLTS</Typography>
      <Link
        style={{ width: "6rem", margin: "0.5rem 0" }}
        to={`${path}/add`}
        className="btn btn-sm btn-success mb-2"
      >
        Add OLT
      </Link>
      <Table className="table table-striped">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableCell} style={{ width: "20%" }}>
              Owner Name
            </TableCell>
            <TableCell className={classes.tableCell} style={{ width: "23%" }}>
              Owner Email
            </TableCell>
            <TableCell className={classes.tableCell} style={{ width: "23%" }}>
              Label
            </TableCell>
            <TableCell className={classes.tableCell} style={{ width: "24%" }}>
              Serial Number
            </TableCell>
            <TableCell
              className={classes.tableCell}
              style={{ width: "10%" }}
            ></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users &&
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  {user.firstName} {user.lastName}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.label}</TableCell>
                <TableCell>{user.number}</TableCell>
                <TableCell style={{ whiteSpace: "nowrap" }}>
                  <Link to={`${path}/edit/${user.id}`}>
                    <Button
                      style={{ marginRight: "0.5rem" }}
                      variant="contained"
                      color="primary"
                    >
                      Edit
                    </Button>
                  </Link>
                  <Button
                    onClick={() => deleteUser(user.id)}
                    variant="contained"
                    color="secondary"
                    disabled={user.isDeleting}
                  >
                    {user.isDeleting ? (
                      <Box className="spinner-border spinner-border-sm"></Box>
                    ) : (
                      <Box>Delete</Box>
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          {!users && (
            <TableRow>
              <TableCell colSpan="4" className="text-center">
                <Box className="spinner-border spinner-border-lg align-center"></Box>
              </TableCell>
            </TableRow>
          )}
          {users && !users.length && (
            <TableRow>
              <TableCell colSpan="4" className="text-center">
                <Box className="p-2">No Users To Display</Box>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export { List };
