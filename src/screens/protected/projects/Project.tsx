import React from "react";
import {useRouteMatch} from "react-router-dom";

export function Project() {
  const {params} = useRouteMatch<{projectId: string}>();
  console.debug({params});
  return (
    <>Project {params.projectId}</>
  );
}