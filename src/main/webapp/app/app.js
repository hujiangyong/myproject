import React from 'react'
import addons  from 'react-addons'
import { render } from 'react-dom'
import { Router, Route, Link,IndexRoute,Redirect,browserHistory,IndexLink } from 'react-router'

window.React = React;
window.ReactDOM = require('react-dom');
window.React.addons = addons;

var Sample = React.createClass({
    render:function(){
        return(
            <div>测试</div>
        )
    }
})

render(<Sample />, document.getElementById('container-react'));