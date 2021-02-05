import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Input } from '../components/atoms/input/input';
import { Button } from '../components/atoms/button/button';
import { useApiCall } from '../hooks/useApiCall';
import { Box } from '../components/atoms/box/box';
import { H1 } from '../components/atoms/typography/typography';
import { UserContext } from '../App';

type LoginData = {
  username: string;
  password: string;
};

const initialLoginDara = {
  username: '',
  password: '',
};

const Login = () => {
  const [formData, setFormData] = useState<LoginData>(initialLoginDara);

  const user = useContext(UserContext);

  const { loading, apiCall } = useApiCall();

  const history = useHistory();

  const loginHandler = () => {
    apiCall.post('/user/login', formData).then((res) => {
      toast(`You are now loged in as ${res.username}`, {
        type: 'success'
      });

      if (user) {
        user?.setUser(res);
      }

      history.push('/');
    });
  };

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-xs-6 col-xs-offset-3">
            <Box>
              <div className="row">
                <div className="col-xs-12 center-xs">
                  <H1>Login</H1>
                </div>
              </div>
              <form onSubmit={(e) => {
                e.preventDefault();
                loginHandler();
              }}
              >
                <div className="row margin-bottom--15">
                  <div className="col-xs-12">
                    <Input
                      type="text"
                      label="Username"
                      placeholder="Your username"
                      value={formData.username}
                      required={true}
                      onChange={(value) => {
                        setFormData({
                          ...formData,
                          username: value
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="row margin-bottom--25">
                  <div className="col-xs-12">
                    <Input
                      type="password"
                      label="password"
                      placeholder="Your Password"
                      value={formData.password}
                      required={true}
                      onChange={(value) => {
                        setFormData({
                          ...formData,
                          password: value
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-12">
                    <div>
                      <Button
                        type="submit"
                        disabled={loading}
                      >
                        Login
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </Box>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
