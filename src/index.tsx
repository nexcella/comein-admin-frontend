import React from 'react';
import ReactDOM from 'react-dom';

import {App} from './App';

// Fix iOS 100vh
document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);


ReactDOM.render(<App/>, document.getElementById('root'));
