import React, { useState, useEffect } from "react";
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

import { Link } from "react-router-dom";

import { userService } from "../../_blacklistServices";

function BlackList({ match }) {
  const { path } = match;
  const [routers, setRouters] = useState(null);

  useEffect(() => {
    userService.getAll().then((x) => setRouters(x));
  }, []);

  function deleteUser(id) {
    // console.log(routers);
    setRouters(
      routers.map((x) => {
        if (x.id === id) {
          x.isDeleting = true;
        }
        return x;
      })
    );
    userService.delete(id).then(() => {
      setRouters((routers) => routers.filter((x) => x.id !== id));
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
    <>
      <TableContainer style={{ padding: "1rem" }} component={Paper}>
        <Typography variant="h3">BLACKLIST</Typography>
        <Link
          style={{ width: "6rem", margin: "0.5rem 0" }}
          to={`${path}/add`}
          className="btn btn-sm btn-success mb-2"
        >
          Add Router
        </Link>
        <Table className="table table-striped">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableCell} style={{ width: "45%" }}>
                Label
              </TableCell>
              <TableCell className={classes.tableCell} style={{ width: "45%" }}>
                Serial Number
              </TableCell>
              <TableCell
                className={classes.tableCell}
                style={{ width: "10%" }}
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {routers &&
              routers.map((router) => (
                <TableRow key={router.id}>
                  <TableCell>{router.label}</TableCell>
                  <TableCell>{router.number}</TableCell>
                  <TableCell style={{ whiteSpace: "nowrap" }}>
                    <Link to={`${path}/edit/${router.id}`}>
                      <Button
                        style={{ marginRight: "0.5rem" }}
                        variant="contained"
                        color="primary"
                      >
                        Edit
                      </Button>
                    </Link>
                    <Button
                      onClick={() => deleteUser(router.id)}
                      variant="contained"
                      color="secondary"
                      disabled={router.isDeleting}
                    >
                      {router.isDeleting ? (
                        <Box className="spinner-border spinner-border-sm"></Box>
                      ) : (
                        <Box>Delete</Box>
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            {!routers && (
              <TableRow>
                <TableCell colSpan="4" className="text-center">
                  <Box className="spinner-border spinner-border-lg align-center"></Box>
                </TableCell>
              </TableRow>
            )}
            {routers && !routers.length && (
              <TableRow>
                <TableCell colSpan="4" className="text-center">
                  <Box className="p-2">Blacklist is clean</Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export { BlackList };
