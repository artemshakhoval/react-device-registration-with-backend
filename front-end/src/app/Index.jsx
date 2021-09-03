import React from "react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import { Box, Container, makeStyles } from "@material-ui/core";
import { Nav, Alert } from "../components";
import { Home } from "../home/Index";
import { OLTS } from "../components/olts/Index";
import { Blacklist } from "../components/blacklist/Index";
import Register from "../components/register";
import PageList from "../components/register/pages";

const useStyles = makeStyles({
  wrapper: {
    backgroundColor: "#F8F9FA",
  },
  content: {
    padding: "40px ",
  },
});

function App() {
  const { pathname } = useLocation();
  const classes = useStyles();
  return (
    <Box className={classes.wrapper}>
      <Nav />
      <Alert />
      <Container className={classes.content}>
        <Switch>
          <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
          <Route exact path="/" component={Home} />
          <Route path="/users" component={OLTS} />
          <Route path="/blacklist" component={Blacklist} />
          <Route path="/register" component={Register} />
          <Route path="/list" component={PageList} />

          <Redirect from="*" to="/" />
        </Switch>
      </Container>
    </Box>
  );
}

export { App };
