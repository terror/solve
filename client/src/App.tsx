import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import ForgotPassword from './pages/Auth/ForgotPassword';
import Dashboard from './pages/Customer/Dashboard';
import NotFound from './pages/NotFound';
import Profile from './pages/Customer/Profile';
import Settings from './pages/Customer/Settings';
import PrivateRoute from './components/PrivateRoute';
import AuthProvider from './providers/AuthProvider';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          <Route path='/forgot' component={ForgotPassword} />
          <PrivateRoute path='/dashboard' component={Dashboard} />
          <PrivateRoute path='/profile' component={Profile} />
          <PrivateRoute path='/settings' component={Settings} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
