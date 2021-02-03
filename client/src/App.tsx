import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './pages/home';
import Create from './pages/create';
import Open from './pages/open';
import Edit from './pages/edit';
import Login from './pages/login';
import NotFound from './pages/notFound';
import Register from './pages/register';
import { Header } from './components/organisms/header/header';
import { Footer } from './components/organisms/footer/footer';
import { useApiCall } from './hooks/useApiCall';

const App = () => {
  // const { loading, apiCall } = useApiCall();

  // useEffect(() => {
  //   apiCall.get('/user').then((res) => {
  //     console.log('res');
  //   });
  // }, []);

  return (
    <Router>
      <div className="content">
        <ToastContainer />
        <Header />
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
      </div>
      <div className="footer">
        <Footer />
      </div>
    </Router>
  );
};

export default App;
