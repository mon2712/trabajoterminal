import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
require('./fillData/menuTypes.json')
require('./styles/index.scss');



ReactDOM.render(
    <App />,
    document.getElementById('app')
);