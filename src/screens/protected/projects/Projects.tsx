import React from 'react';
import {Route, Switch, useRouteMatch} from "react-router-dom";

import {ProjectList} from "./ProjectList";
import {Project} from "./Project";
import {ProjectCreateScreen} from "./ProjectCreate";

export function Projects() {
  const {path} = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={ProjectList}>
      </Route>
      <Route path={`${path}/create`} component={ProjectCreateScreen}/>
      <Route path={`${path}/:projectId`} component={Project}/>
    </Switch>
  )
}