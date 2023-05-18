import { useState } from "react";
import { Field, reduxForm } from "redux-form";
import { compose } from "redux";
import { Link } from "react-router-dom";
import renderFormGroupField from "../../helpers/renderFormGroupField";
import renderFormField from "../../helpers/renderFormField";
import { useHistory } from 'react-router-dom';
import {
  required,
  maxLength20,
  minLength8,
  maxLengthMobileNo,
  minLengthMobileNo,
  digit,
  name,
  email,
} from "../../helpers/validation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebookF,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import { ReactComponent as IconPhone } from "bootstrap-icons/icons/phone.svg";
import { ReactComponent as IconShieldLock } from "bootstrap-icons/icons/shield-lock.svg";
import axios from 'axios';



const SignUpForm = ({ history }) => {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/users/register', {
        "email": email,
        "password": password,
        "full_name": user
      });

      if (response.status === 200) {
        window.alert("Đăng ký thành công");
        window.location.href = '/account/signin';
      }
    } catch (error) {
      window.alert("Đăng ký thất bại");
      console.log(error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
      // className={`needs-validation ${submitFailed ? "was-validated" : ""}`}
      // noValidate
      >
        <Field
          name="userName"
          type="text"
          label="User Name"
          value={user}
          component={renderFormField}
          placeholder="User Name"
          validate={[required, name]}
          required={true}
          className="mb-3"
          onChange={(e) => setUser(e.target.value)}
        />
        <Field
          name="email"
          type="email"
          label="Email"
          value={email}
          component={renderFormGroupField}
          placeholder="Your Email"
          icon={IconPhone}
          validate={[required, maxLength20, minLength8]}
          required={true}
          maxLength="20"
          minLength="8"
          className="mb-3"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Field
          name="password"
          type="password"
          label="Your password"
          value={password}
          component={renderFormGroupField}
          placeholder="******"
          icon={IconShieldLock}
          validate={[required, maxLength20, minLength8]}
          required={true}
          maxLength="20"
          minLength="8"
          className="mb-3"
          onChange={(e) => setPassword(e.target.value)}

        />
        <div className="d-grid">
          <button
            type="submit"
            className="btn btn-primary mb-3"
          // disabled={submitting}
          >
            Create
          </button>
        </div>
        <Link className="float-start" to="/account/signin" title="Sign In">
          Sing In
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
            {/* <Link to="/" className="btn btn-light text-white bg-twitter me-3">
            <FontAwesomeIcon icon={faTwitter} />
          </Link> */}
            {/* <Link to="/" className="btn btn-light text-white me-3 bg-facebook">
              <FontAwesomeIcon icon={faFacebookF} className="mx-1" />
            </Link>
            <Link to="/" className="btn btn-light text-white me-3 bg-google">
              <FontAwesomeIcon icon={faGoogle} className="mx-1" />
            </Link> */}
          </div>
        </div>
      </form>

    </>
  );
};

export default compose(
  reduxForm({
    form: "signup",
  })
)(SignUpForm);
