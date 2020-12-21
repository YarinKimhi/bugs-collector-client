import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route,Switch} from 'react-router-dom'
import Register from '../src/user/register/screens/register'
import Login from '../src/user/login/screens/login'
import BugReport from '../src/dashboard/screens/bugreport.screen'
import DashBoard from '../src/dashboard/screens/dashboard.screen'
import 'react-toastify/dist/ReactToastify.css'
import PrivateRoute from '../src/user/login/components/private.component'
import Stats from '../src/dashboard/screens/stats.screen'

ReactDOM.render(
  <BrowserRouter>
  <Switch>
    <Route path='/' exact render={props => <Login  {...props}/>} />
    <Route path='/register' exact render={props => <Register {...props}/>} />
    <PrivateRoute path="/dash/stats/" component={Stats} />
    <PrivateRoute path="/dash/bugreport/" component={BugReport} />
    <PrivateRoute path="/dash/" component={DashBoard} />
  </Switch>
  </BrowserRouter>,
document.getElementById('root')
);

// import Activate from './Screens/activate'
//<Route path='/user/activate/:token' exact render={props => <Activate {...props}/>} />

// <Route path='/dash/bugreport/' exact render={props => <BugReport {...props}/>} />
// <Route path='/dash/' exact render={props => <DashBoard {...props}/>} />