import React from 'react';

import logo from './logo.svg';
import inlineLogo from './logo-inline.svg';

export function Logo({inline = false}: { inline?: boolean }) {
  return <img src={inline ? inlineLogo : logo} alt='ComeIn logo'/>;
}
