import React from "react";
import "./LoginPage.css";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaUnlockKeyhole } from "react-icons/fa6";
import { CiUser } from "react-icons/ci";
const LoginPage = () => {
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
                        <div className="form-group">
                          <input
                            type="email"
                            name="logemail"
                            className="form-style"
                            placeholder="Your Email"
                            id="logemail"
                            autoComplete="off"
                          />
                          <i className="input-icon uil uil-at"></i>
                          <MdOutlineAlternateEmail className="input-icon" />
                        </div>
                        <div className="form-group mt-2">
                          <input
                            type="password"
                            name="logpass"
                            className="form-style"
                            placeholder="Your Password"
                            id="logpass"
                            autoComplete="off"
                          />
                          <i className="input-icon uil uil-lock-alt"></i>
                          <FaUnlockKeyhole  className="input-icon" />
                        </div>
                        <a href="#" className="btn mt-4">
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
                        <div className="form-group">
                          <input
                            type="text"
                            name="logname"
                            className="form-style"
                            placeholder="Your Full Name"
                            id="logname"
                            autoComplete="off"
                          />
                          <i className="input-icon uil uil-user"></i>
                          <CiUser  className="input-icon" />
                        </div>
                        <div className="form-group mt-2">
                          <input
                            type="email"
                            name="logemail"
                            className="form-style"
                            placeholder="Your Email"
                            id="logemail"
                            autoComplete="off"
                          />
                          <i className="input-icon uil uil-at"></i>
                          <MdOutlineAlternateEmail className="input-icon" />
                        </div>
                        <div className="form-group mt-2">
                          <input
                            type="password"
                            name="logpass"
                            className="form-style"
                            placeholder="Your Password"
                            id="logpass"
                            autoComplete="off"
                          />
                          <i className="input-icon uil uil-lock-alt"></i>
                          <FaUnlockKeyhole className="input-icon" />
                        </div>
                        <a href="#" className="btn mt-4">
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
    </div>
  );
};

export default LoginPage;