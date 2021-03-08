import React from 'react';
import {Link, useRouteMatch} from 'react-router-dom';
import {Button} from "../../../components/ui-kit/Button";

export function ProjectList() {
  const {url} = useRouteMatch();

  return (
    <>
      <Button to={`${url}/create`} text='Создать проект'/>
      <div>
        <h2>ProjectList</h2>
        <div>Test project - <Link to={`${url}/1-123`}>show project</Link></div>
        <div>Test project2 - <Link to={`${url}/2-123`}>show project</Link></div>
        <div>Test project3 - <Link to={`${url}/3-123`}>show project</Link></div>
        <div>Test project4 - <Link to={`${url}/4-123`}>show project</Link></div>
        <div>Test project5 - <Link to={`${url}/5-123`}>show project</Link></div>
        <div>Test project6 - <Link to={`${url}/6-123`}>show project</Link></div>
        <div>Test project7 - <Link to={`${url}/7-123`}>show project</Link></div>
      </div>
    </>
  );
}