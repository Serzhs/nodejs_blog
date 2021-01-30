import React, { useState } from 'react';
import axios from 'axios';

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

  const rgisterHandler = () => {
    axios
      .post(`${process.env.REACT_APP_HOST}/register`, formData)
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
            <h1>Register</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-6 col-xs-offset-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                rgisterHandler();
              }}
            >
              <label htmlFor="name" className="form-group w-100 mb-3">
                <span className="d-block mb-1">Username</span>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  placeholder="Your username"
                  required={true}
                  value={formData.username}
                  onChange={(e) => {
                    setForData({
                      ...formData,
                      username: e.target.value,
                    });
                  }}
                />
              </label>
              <label htmlFor="password" className="form-group w-100 mb-3">
                <span className="d-block mb-1">Password</span>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Password"
                  required={true}
                  value={formData.password}
                  onChange={(e) => {
                    setForData({
                      ...formData,
                      password: e.target.value,
                    });
                  }}
                />
              </label>
              <label htmlFor="password" className="form-group w-100 mb-3">
                <span className="d-block mb-1">Password</span>
                <input
                  type="password"
                  id="passwordConfirm"
                  className="form-control"
                  placeholder="Confirm password"
                  required={true}
                  value={formData.passwordConfirm}
                  onChange={(e) => {
                    setForData({
                      ...formData,
                      passwordConfirm: e.target.value,
                    });
                  }}
                />
              </label>
              <div className="w-100 text-center">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
