import React, { useEffect, useState } from 'react';
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
import { Spinner } from './components/atoms/spinner/spinner';
import { PrivateCreate } from './privateRoutes/create';
import { PrivateEdit } from './privateRoutes/edit';

export type User = {
  username: string;
  isAdmin: boolean;
};

type UserContextTypes = {
  user?: User,
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>
};

export const UserContext = React.createContext<UserContextTypes | undefined>(undefined);

const App = () => {
  const [user, setUser] = useState<User | undefined>();
  const [pageLoaded, setPageLoaded] = useState(false);
  const { loading, apiCall } = useApiCall();

  useEffect(() => {
    let isCancelled = false;

    apiCall.get('/user').then((userData) => {
      if (!isCancelled && userData) {
        setUser(userData);
      }
    }).finally(() => {
      setPageLoaded(true);
    });

    return () => {
      isCancelled = true;
    };
  }, []);

  if (loading || !pageLoaded) {
    return (
      <div className="row center-xs">
        <Spinner />
      </div>
    );
  }

  return (
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        <div className="content">
          <ToastContainer />
          <Header />
          <Switch>
            <PrivateCreate
              path="/create"
              user={user}
            >
              <Create />
            </PrivateCreate>
            <PrivateEdit
              path="/edit/:slug"
              user={user}
            >
              <Edit />
            </PrivateEdit>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/post/:slug">
              <Open />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </UserContext.Provider>
      <div className="footer">
        <Footer />
      </div>
    </Router>
  );
};

export default App;
