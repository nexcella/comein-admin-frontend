import React from "react";
import {Link} from "react-router-dom";

import {Button} from "./Button";

type ButtonLinkProps = {
  to: string,
  text: string
}
export function ButtonLink({text, to}: ButtonLinkProps) {
  return (
    <Link to={to}>
      <Button text={text}/>
    </Link>
  )
}
