import React from 'react';
import {Route, Switch, useRouteMatch} from "react-router-dom";

import {ProjectList} from "./ProjectList";
import {CreateProject} from "./CreateProject";
import {Project} from "./Project";

export function Projects() {
  const {path} = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={ProjectList}>
      </Route>
      <Route path={`${path}/create`} component={CreateProject}/>
      <Route path={`${path}/:projectId`} component={Project}/>
    </Switch>
  )
}