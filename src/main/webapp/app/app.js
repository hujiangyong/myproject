import React from 'react'
import addons  from 'react-addons'
import { render } from 'react-dom'
import { Router, Route, Link,IndexRoute,Redirect,browserHistory,IndexLink } from 'react-router'

window.React = React;
window.ReactDOM = require('react-dom');
window.React.addons = addons;


var Main = require('./core/main');
var User = require('./core/user');

let routes = (
    <Router history={browserHistory}>
        <Route path="/" component={Main}>
            <IndexRoute component={User} />
            <Route path="User" component={User} />
        </Route>
    </Router>
)

render(routes, document.getElementById('container-react'));