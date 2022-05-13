import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { registerUser } = useContext(AuthContext);
  const defaultValues = {
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  };
  const [formData, handleInputChange, handleSubmit] = useCustomForm(
    defaultValues,
    registerUser
  );

  return (
    <div className="login-page-background">
      <div className="login-img">
        <div className="register-user-container2">
          <form onSubmit={handleSubmit}>
            <div className="register-user-container">
              <div>
                <h1>REGISTER</h1>
              </div>
              <div className="input-boxes">
                <div>
                  <label>
                    Username:{" "}
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
                <div>
                  <label>
                    First Name:{" "}
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Last Name:{" "}
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Email:{" "}
                    <input
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Password:{" "}
                    <input
                      type="text"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
              </div>
              <p style={{ fontSize: "12px" }}>
                NOTE: Make this an uncommon password with characters, numbers,
                and special characters!
              </p>
              <button>Register!</button>
            </div>
          </form>
          <button onClick={() => navigate("/login")}>Back to Login</button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
