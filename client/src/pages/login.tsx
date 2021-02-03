import axios from 'axios';
import React, { useState } from 'react';
import { Input } from '../components/atoms/input/input';
import { Button } from '../components/atoms/button/button';

type LoginData = {
  username: string;
  password: string;
};

const initialLoginDara = {
  username: '',
  password: '',
};

const Login = () => {
  const [formData, setForData] = useState<LoginData>(initialLoginDara);

  const loginHandler = () => {
    axios
      .post(`${process.env.REACT_APP_HOST}/user/login`, formData)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 center-xs">
            <h1>Login</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-4 col-xs-offset-4">
            <form
              onSubmit={(e) => {
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
                      setForData({
                        ...formData,
                        username: value
                      });
                    }}
                  />
                </div>
              </div>
              <div className="row margin-bottom--15">
                <div className="col-xs-12">
                  <Input
                    type="password"
                    label="password"
                    placeholder="Your Password"
                    value={formData.password}
                    required={true}
                    onChange={(value) => {
                      setForData({
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
                    >
                      Login
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
