import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './pages/home';
import Create from './pages/create';
import Open from './pages/open';
import Edit from './pages/edit';
import NotFound from './pages/notFound';

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <header className="pb-3 pt-3">
        <div className="container">
          <div className="row mb-3">
            <div className="col-xs-12 center-xs">
              <nav className="nav justify-content-center">
                <Link className="nav-link" to="/">
                  Home
                </Link>
                <Link className="nav-link" to="/create">
                  Create
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </header>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/create">
          <Create />
        </Route>
        <Route path="/post/:slug">
          <Open />
        </Route>
        <Route path="/edit/post/:slug">
          <Edit />
        </Route>
        <Route path="/404">
          <NotFound />
        </Route>
      </Switch>
    </Router>

  );
};

export default App;
