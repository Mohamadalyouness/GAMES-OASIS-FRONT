import React, { useState, useContext } from "react";
import axios from "axios";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaUnlockKeyhole } from "react-icons/fa6";
import { CiUser } from "react-icons/ci";
import { MdOutlineGames } from "react-icons/md";
const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gamingName, setGamingName] = useState("");
  const [username, setusername] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = async () => {
    try {
      const response = await axios.post("https://games-oasis-back-1.onrender.com/api/login", {
        username,
        password,
      });
      console.log("Login successful!", response.data);

      // Save user data and token to local storage
      localStorage.setItem("userData", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);
      // Check if the user is an admin
      if (response.data.user.role === "admin") {
        // If the user is an admin, navigate to the admin dashboard
        navigate("/AdminUsersPage");
      } else {
        // If the user is not an admin, navigate to the user dashboard
        navigate("/");
      }
      // Refresh the page to trigger re-render of the Navbar component
      window.location.reload();

      toast.success("Welcome, " + username + "!");
    } catch (error) {
      console.error("Error occurred during login:", error);
      toast.error("UserName or password is incorrect please try again!");
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post("https://games-oasis-back-1.onrender.com/api/register", {
        username,
        gamingName,
        email,
        password,
      });
      console.log("Registration successful!", response.data);
      toast.success("Registration successful!");
    } catch (error) {
      console.error("Error occurred during registration:", error);
      toast.error("Registration failed!");
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="section">
      <div className="container">
        <div className="row full-height justify-content-center">
          <div className="col-12 text-center align-self-center py-5">
            <div className="section pb-5 pt-5 pt-sm-2 text-center">
              <h6 className="mb-0 pb-3">
                <span>Log In </span>
                <span>Sign Up</span>
              </h6>
              <input
                className="checkbox"
                type="checkbox"
                id="reg-log"
                name="reg-log"
              />
              <label htmlFor="reg-log"></label>
              <div className="card-3d-wrap mx-auto">
                <div className="card-3d-wrapper">
                  <div className="card-front">
                    <div className="center-wrap">
                      <div className="section text-center">
                        <h4 className="mb-4 pb-3">Log In</h4>
                        <i className="input-icon uil uil-at"></i>
                        <CiUser className="input-icon" />
                        <div className="form-group">
                          <input
                            type="text"
                            name="logemail"
                            className="form-style"
                            placeholder="Full Name"
                            value={username}
                            onChange={(e) => setusername(e.target.value)}
                            autoComplete="off"
                          />
                        </div>
                        <i className="input-icon uil uil-lock-alt"></i>
                        <FaUnlockKeyhole className="input-icon" />
                        <div className="form-group mt-2">
                          <input
                            type="password"
                            name="logpass"
                            className="form-style"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="off"
                          />
                        </div>
                        <a href="#" onClick={handleLogin} className="btn mt-4">
                          submit
                        </a>
                        <p className="mb-0 mt-4 text-center">
                          <a href="#0" className="link">
                            Forgot your password?
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="card-back">
                    <div className="center-wrap">
                      <div className="section text-center">
                        <h4 className="mb-4 pb-3">Sign Up</h4>
                        <i className="input-icon uil uil-user"></i>
                        <CiUser className="input-icon" />
                        <div className="form-group">
                          <input
                            type="text"
                            name="logname"
                            className="form-style"
                            placeholder="Full Name"
                            value={username}
                            onChange={(e) => setusername(e.target.value)}
                            id="logname"
                            autoComplete="off"
                          />
                        </div>
                        <i className="input-icon uil uil-at"></i>
                        <MdOutlineGames className="input-icon" />
                        <div className="form-group">
                          <input
                            type="text"
                            name="gamingName"
                            className="form-style"
                            placeholder="Gaming Name"
                            value={gamingName}
                            onChange={(e) => setGamingName(e.target.value)}
                            id="gamingName"
                            autoComplete="off"
                          />
                        </div>
                        <i className="input-icon uil uil-at"></i>
                        <MdOutlineAlternateEmail className="input-icon" />
                        <div className="form-group mt-2">
                          <input
                            type="email"
                            name="logemail"
                            className="form-style"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            id="logemail"
                            autoComplete="off"
                          />
                        </div>
                        <i className="input-icon uil uil-lock-alt"></i>
                        <FaUnlockKeyhole className="input-icon" />
                        <div className="form-group mt-2">
                          <input
                            type="password"
                            name="logpass"
                            className="form-style"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            id="logpass"
                            autoComplete="off"
                          />
                        </div>
                        <a
                          href="#"
                          onClick={handleRegister}
                          className="btn mt-4"
                        >
                          submit
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer className="foo" />
    </div>
  );
};

export default LoginPage;
