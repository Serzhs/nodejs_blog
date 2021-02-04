import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useApiCall } from '../hooks/useApiCall';
import { Input } from '../components/atoms/input/input';
import { Button } from '../components/atoms/button/button';
import { H1 } from '../components/atoms/typography/typography';
import { Box } from '../components/atoms/box/box';

type LoginData = {
  username: string;
  password: string;
  passwordConfirm: string;
};

const initialLoginDara = {
  username: '',
  password: '',
  passwordConfirm: '',
};

const Register = () => {
  const [formData, setForData] = useState<LoginData>(initialLoginDara);
  const { loading, apiCall } = useApiCall();
  const history = useHistory();

  const rgisterHandler = () => {
    apiCall.post('/user/register', formData).then(() => {
      toast('Registration successful', {
        type: 'success'
      });
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
                  <H1>Register</H1>
                </div>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  rgisterHandler();
                }}
              >
                <div className="row margin-bottom--15">
                  <div className="col-xs-12">
                    <Input
                      type="text"
                      label="Username"
                      placeholder="Your username"
                      value={formData.username}
                      minLength={3}
                      maxLength={30}
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
                <div className="row">
                  <div className="col-xs-12">
                    <div className="row margin-bottom--15">
                      <div className="col-xs-12">
                        <Input
                          type="password"
                          label="Password"
                          placeholder="Your Password"
                          value={formData.password}
                          minLength={3}
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
                  </div>
                </div>
                <div className="row margin-bottom--25">
                  <div className="col-xs-12">
                    <Input
                      type="password"
                      label="Confirm Password"
                      placeholder="Confirm your Password"
                      value={formData.passwordConfirm}
                      minLength={3}
                      required={true}
                      onChange={(value) => {
                        setForData({
                          ...formData,
                          passwordConfirm: value
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
                        Register
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

export default Register;
