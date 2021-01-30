import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, NavLink
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './pages/home';
import Create from './pages/create';
import Open from './pages/open';
import Edit from './pages/edit';
import Login from './pages/login';
import NotFound from './pages/notFound';
import Register from './pages/register';

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <header className="pb-3 pt-3">
        <div className="container">
          <div className="row mb-3 middle-xs">
            <div className="col-xs-3">
              <span className="d-inline-flex shadow-none p-3 bg-light rounded">
                Logo
              </span>
            </div>
            <div className="col-xs-6 center-xs">
              <nav className="nav justify-content-center">
                <Link className="nav-link" to="/">
                  Home
                </Link>
                <Link className="nav-link" to="/create">
                  Create
                </Link>
              </nav>
            </div>
            <div className="col-xs-3 d-flex end-xs">
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
              <NavLink className="nav-link" to="/register">
                Register
              </NavLink>
            </div>
          </div>
        </div>
      </header>
      <Switch>
        <Route exact path="/create">
          <Create />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/post/:slug">
          <Open />
        </Route>
        <Route exact path="/edit/:slug">
          <Edit />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>

  );
};

export default App;
