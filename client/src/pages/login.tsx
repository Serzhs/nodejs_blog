import React, { useState } from 'react';

type LoginData = {
  name: string,
  password: string,
};

const initialLoginDara = {
  name: '',
  password: '',
};

const Login = () => {
  const [formData, setForData] = useState<LoginData>(initialLoginDara);

  const loginHandler = () => {
    console.log('Login');
  };

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 center-xs">
            <h1>
              Login
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-6 col-xs-offset-3">
            <form onSubmit={(e) => {
              e.preventDefault();
              loginHandler();
            }}
            >
              <label htmlFor="name" className="form-group w-100 mb-3">
                <span className="d-block mb-1">
                  Username
                </span>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  placeholder="Your username"
                  value={formData.name}
                  onChange={(e) => {
                    setForData({
                      ...formData,
                      name: e.target.value
                    });
                  }}
                />
              </label>
              <label htmlFor="password" className="form-group w-100 mb-3">
                <span className="d-block mb-1">
                  Password
                </span>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => {
                    setForData({
                      ...formData,
                      password: e.target.value
                    });
                  }}
                />
              </label>
              <div className="w-100 text-center">
                <button
                  type="submit"
                  className="btn btn-primary"
                >
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


export default Login;
