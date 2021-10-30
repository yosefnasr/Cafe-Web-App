import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import { login } from "../actions/authoritarian";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Login = ({ login, Authorized, admin }) => {
  const [formData, setformData] = useState({
    username: "",
    password: ""
  });
  const { username, password } = formData;

  const onChange = e =>
    setformData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login({ username, password });
  };
  if (Authorized) {
    if (admin) {
      return <Redirect to="/admin" />;
    }
  }

  return (
    <Fragment>
      <div className="login-photo">
        <div className="form-container">
          <div className="image-holder"></div>
          <form onSubmit={e => onSubmit(e)}>
            <h2 className="text-center">
              <strong>Login</strong>
            </h2>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                name="username"
                placeholder="Username"
                value={username}
                onChange={e => onChange(e)}
                required
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="password"
                name="password"
                placeholder="Password"
                minLength="6"
                value={password}
                onChange={e => onChange(e)}
                required
              />
            </div>
            <br></br>
            <div className="form-group">
              <button className="btn btn-dark btn-block" type="submit">
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};
Login.prototype = {
  login: PropTypes.func.isRequired,
  Authorized: PropTypes.bool,
  admin: PropTypes.bool
};

const mapStateToProps = state => ({
  Authorized: state.authoritarian.Authorized,
  admin: state.authoritarian.admin
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
