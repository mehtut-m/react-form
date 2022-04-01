import React from 'react';
import { Formik, Form, Field } from 'formik';

import { validEmail, validPassword, passwordMatch } from '../utils/validation';

const WithFormik = () => {
  const validateEmail = (value) => {
    let error;
    if (!validEmail(value)) {
      error = 'Invalid Email';
    }
    return error;
  };

  const validatePassword = (value) => {
    let error;
    if (!validPassword(value)) {
      error = 'Invalid Password';
    }
    return error;
  };

  const validatePasswordMatch = (password, confirmPassword) => {
    let error;
    if (!passwordMatch(password, confirmPassword)) {
      error = 'Password does not match';
    }
    return error;
  };

  return (
    <>
      <h1>With Formik</h1>
      <Formik
        initialValues={{
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validate={(values) => {
          const error = {};
          const { email, password, confirmPassword } = values;
          if (!validEmail(email)) {
            error.email = 'Invalid Email';
          } else if (!validPassword(password)) {
            error.password = 'Invalid Password';
          }
        }}
        onSubmit={(values) => {
          // same shape as initial values
          console.log(values);
        }}
      >
        {({ errors, touched, isValid, values, dirty }) => (
          <Form>
            <div className="">
              <label>Email</label>
              <Field name="email" validate={validateEmail} />
              {errors.email && touched.email && <div>{errors.email}</div>}
            </div>
            <div className="">
              <label>Password</label>
              <Field
                name="password"
                validate={validatePassword}
                type="password"
              />
              {errors.password && touched.password && (
                <div>{errors.password}</div>
              )}
            </div>
            <div className="">
              <label>Confirm password</label>
              <Field
                name="confirmPassword"
                validate={(value) =>
                  validatePasswordMatch(value, values.password)
                }
                type="password"
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <div>{errors.confirmPassword}</div>
              )}
            </div>
            <button type="submit" disabled={!isValid || !dirty}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default WithFormik;
