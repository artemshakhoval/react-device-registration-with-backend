import React from "react";
import { Route, Switch } from "react-router-dom";

import { BlackList } from "./BlackList";
import { AddEdit } from "./AddEdit";

function Blacklist({ match }) {
  const { path } = match;

  return (
    <Switch>
      <Route exact path={path} component={BlackList} />
      <Route path={`${path}/add`} component={AddEdit} />
      <Route path={`${path}/edit/:id`} component={AddEdit} />
    </Switch>
  );
}

export { Blacklist };
