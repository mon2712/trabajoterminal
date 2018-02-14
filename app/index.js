var React = require('react');
var ReactDOM = require('react-dom');
import AppContainer from './containers/AppContainer';
require('./index.scss');

ReactDOM.render(
    <AppContainer />,
    document.getElementById('app')
);