import React, { useState } from 'react';
import { Field, reduxForm } from "redux-form";
import { compose } from "redux";
import { Link } from "react-router-dom";
import renderFormGroupField from "../../helpers/renderFormGroupField";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  required,
  maxLength20,
  minLength8,
  maxLengthMobileNo,
  minLengthMobileNo,
  digit,
} from "../../helpers/validation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebookF,
  faGoogle,
}
  from "@fortawesome/free-brands-svg-icons";
import { ReactComponent as IconPhone } from "bootstrap-icons/icons/phone.svg";
import { ReactComponent as IconShieldLock } from "bootstrap-icons/icons/shield-lock.svg";
import axios from 'axios';

const SignInForm = (props) => {
  // const { handleSubmit, submitting,onSubmit, submitFailed } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const [isLoggedIn, setIsLoggedIn] = useState(false);


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/users/login', {
        "email": email,
        "password": password
      });

      if (response.status === 200) {
        window.alert("Login thành công");
        const user = response.data.user;

        if (user.role === "USER") {
          localStorage.setItem('user', JSON.stringify(user));
        }
        else if (user.role === "ADMIN") {
          localStorage.setItem('admin', JSON.stringify(user));
        }

        window.location.href = '/';
      }
    } catch (error) {
      window.alert("Mật khẩu hoặc tài khoản chưa chính xác");
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
    // className={`needs-validation ${submitFailed ? "was-validated" : ""}`}
    // noValidate
    >
      <Field
        name="email"
        type="email"
        label="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        component={renderFormGroupField}
        placeholder="Your Email"
        icon={IconPhone}
        // validate={[required, maxLengthMobileNo, minLengthMobileNo, digit]}
        // required={true}
        // max="999999999999999"
        // min="9999"
        className="mb-3"
      />
      <Field
        name="password"
        type="password"
        label="Your password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        component={renderFormGroupField}
        placeholder="******"
        icon={IconShieldLock}
        validate={[required, maxLength20, minLength8]}
        required={true}
        maxLength="20"
        minLength="8"
        className="mb-3"
      />
      <div className="d-grid">
        <button
          type="submit"
          className="btn btn-primary mb-3"
        >
          Log In
        </button>
      </div>
      <Link className="float-start" to="/account/signup" title="Sign Up">
        Create your account
      </Link>
      <Link
        className="float-end"
        to="/account/forgotpassword"
        title="Forgot Password"
      >
        Forgot password?
      </Link>
      <div className="clearfix"></div>
      <hr></hr>
      <div className="row">
        {/* <div className="col- text-center">
          <p className="text-muted small">Or you can join with</p>
        </div> */}
        <div className="col- text-center">

          {/* <Link to="/" className="btn btn-light text-white me-3 bg-facebook">
            <FontAwesomeIcon icon={faFacebookF} className="mx-1" />
          </Link>
          <Link to="/" className="btn btn-light text-white me-3 bg-google">
            <FontAwesomeIcon icon={faGoogle} className="mx-1" />
          </Link> */}
        </div>
      </div>
    </form>
  );
};

export default compose(
  reduxForm({
    form: "signin",
  })
)(SignInForm);
