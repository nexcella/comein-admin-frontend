import React from "react";
import {Link, useRouteMatch} from "react-router-dom";
import styled, {StyledComponent} from "astroturf";

const MenuWrapper = styled.div`
  margin: 50px 0 15px 15px;
  padding: 24px 0;
  border-radius: 18px 0 0 18px;
  background-color: rgba(29, 181, 216, 0.1);
`
const MenuItemWrapper = styled.li`
  font-size: 16px;
  line-height: 35px;
`

const StyledLink: StyledComponent<"a", { isActive?: boolean, to: any }> = styled(Link)`
  color: rgba(67, 67, 67, 0.7);
  text-decoration: none;
  display: block;
  padding-left: 15px;

  &:hover {
    color: #434343;
    background: rgba(29, 181, 216, 0.15);
  }

  &.isActive {
    background: rgba(29, 181, 216);
    color: white;
  }
`

function MenuItem({title, path}: { title: string, path: string }) {
  const isActive = useRouteMatch({
    path,
    exact: false
  });
  return (
    <MenuItemWrapper>
      <StyledLink to={path} isActive={Boolean(isActive)}>
        {title}
      </StyledLink>
    </MenuItemWrapper>
  )
}

export function Menu() {
  return <MenuWrapper>
    <ul>
      <MenuItem title='Проекты' path='/projects'/>
    </ul>
  </MenuWrapper>;
}
