import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import { compose } from "redux";
import renderFormGroupField from "../../helpers/renderFormGroupField";
import { required, maxLength20, minLength8 } from "../../helpers/validation";
import { ReactComponent as IconShieldLock } from "bootstrap-icons/icons/shield-lock.svg";
import { ReactComponent as IconKey } from "bootstrap-icons/icons/key.svg";
import axios from 'axios';

const ChangePasswordForm = (props) => {

  const user = JSON.parse(localStorage.getItem('user'));



  const onSubmit = (formData) => {
    const { currentPassword, password } = formData;
    console.log("cu: " + currentPassword);
    console.log("moi" + password);

    axios.put(`http://localhost:8080/api/users/${user.id}/change-password`, {
      "oldPassword": currentPassword,
      "newPassword": password
    })
      .then(response => {
        window.alert("Đổi mật khẩu thành công");
        console.log(response.data);
        // Xử lý thông báo thành công
      })
      .catch(error => {
        window.alert("Đổi mật khẩu thất bại ");
        console.log(error);
        // Xử lý thông báo lỗi
      });
  };

  // const onSubmit = (formData) => {
  //   const { values } = formData;
  //   const { name, mobileNo, location } = values;
  //   // console.log("img" + formFile);
  //   console.log("name " + name);
  //   console.log("mobi " + mobileNo);
  //   console.log("location " + location);



  //   axios.put(`http://localhost:8080/api/users/${user.id}/edit-profile`, {
  //     "name": name,
  //     "mobileNo": mobileNo,
  //     "location": location
  //   })
  //     .then(response => {
  //       console.log(response.data);
  //       // Xử lý thông báo thành công
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       // Xử lý thông báo lỗi
  //     });
  // };


  const { handleSubmit, submitting, submitFailed } = props;
  return (
    <div className="card border-info">
      <h6 className="card-header bg-info text-white">
        <IconKey /> Change Password
      </h6>
      <div className="card-body">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`needs-validation ${submitFailed ? "was-validated" : ""}`}
          noValidate
        >
          <Field
            name="currentPassword"
            type="password"
            label="Current Password"
            component={renderFormGroupField}
            placeholder="******"
            icon={IconShieldLock}
            validate={[required, maxLength20, minLength8]}
            required={true}
            maxLength="20"
            minLength="8"
            className="mb-3"
          />
          <Field
            name="password"
            type="password"
            label="New Password"
            component={renderFormGroupField}
            placeholder="******"
            icon={IconShieldLock}
            validate={[required, maxLength20, minLength8]}
            required={true}
            maxLength="20"
            minLength="8"
            className="mb-3"
          />
          <Field
            name="confirmPassword"
            type="password"
            label="Confirm New password"
            component={renderFormGroupField}
            placeholder="******"
            icon={IconShieldLock}
            validate={[required, maxLength20, minLength8]}
            required={true}
            maxLength="20"
            minLength="8"
            className="mb-3"
          />
          <button
            type="submit"
            className="btn btn-info  d-flex"
            disabled={submitting}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default compose(
  reduxForm({
    form: "changepassword",
  })
)(ChangePasswordForm);

// export default compose(
//   reduxForm({
//     form: "changepassword",
//     onSubmit
//   })
// )(ChangePasswordForm);
