import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route,Switch} from 'react-router-dom'
import Register from './Screens/Register'
import Activate from './Screens/activate'
import Login from './Screens/Login'
import BugReport from './Screens/BugReport'
import DashBoard from './Screens/Dashboard'
import 'react-toastify/dist/ReactToastify.css'


ReactDOM.render(
  <BrowserRouter>
  <Switch>
    <Route path='/' exact render={props => <Login {...props}/>} />
    <Route path='/register' exact render={props => <Register {...props}/>} />
    <Route path='/user/activate/:token' exact render={props => <Activate {...props}/>} />
    <Route path='/dash/bugreport/:token' exact render={props => <BugReport {...props}/>} />
    <Route path='/dash/:token' exact render={props => <DashBoard {...props}/>} />
  </Switch>
  </BrowserRouter>,
document.getElementById('root')
);
//