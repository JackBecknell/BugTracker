import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";
import { Link } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const { loginUser, isServerError } = useContext(AuthContext);
  const defaultValues = { username: "", password: "" };
  const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
    defaultValues,
    loginUser
  );

  useEffect(() => {
    if (isServerError) {
      reset();
    }
  }, [isServerError]);

  return (
    <div className="login-page-background">
      <div className="login-img">
        <div className="login-container">
          <div>
            <h1>LOGIN</h1>
          </div>
          <form className="form" onSubmit={handleSubmit}>
            <label>
              <h3>USERNAME</h3>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
            </label>
            <label>
              <h3>PASSWORD</h3>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </label>
            {isServerError ? (
              <p className="error">Login failed, incorrect credentials!</p>
            ) : null}

            <div className="signIn">
              <button className="dfaultButton">SIGN IN</button>
            </div>
            <div className="register-link" style={{ textDecoration: "none" }}>
              <Link to="/register">
                <p>REGISTER</p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
