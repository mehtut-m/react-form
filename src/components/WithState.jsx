import React, { useState } from 'react';
import { isEmpty, isEmail } from 'validator';

import { validEmail, validPassword, passwordMatch } from '../utils/validation';

function WithState() {
  const [input, setInput] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isValid, setIsValid] = useState({
    password: false,
    confirmPassword: false,
    email: false,
  });

  const disable = Object.values(isValid).filter((item) => !item).length === 0;

  const handleInputChage = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // Validate Email
    switch (e.target.name) {
      case 'email':
        if (validEmail(e.target.value)) {
          setIsValid((prev) => ({ ...prev, [e.target.name]: true }));
        } else {
          setIsValid((prev) => ({ ...prev, [e.target.name]: false }));
        }
        break;
      case 'password':
        if (
          validPassword(e.target.value) &&
          passwordMatch(input.confirmPassword, e.target.value)
        ) {
          setIsValid((prev) => ({ ...prev, [e.target.name]: true }));
          setIsValid((prev) => ({ ...prev, confirmPassword: true }));
        } else {
          setIsValid((prev) => ({ ...prev, [e.target.name]: false }));
        }
        break;
      case 'confirmPassword':
        if (
          validPassword(e.target.value) &&
          passwordMatch(input.password, e.target.value)
        ) {
          setIsValid((prev) => ({ ...prev, [e.target.name]: true }));
          setIsValid((prev) => ({ ...prev, confirmPassword: true }));
        } else {
          setIsValid((prev) => ({ ...prev, [e.target.name]: false }));
        }
        break;
      default:
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEmpty(input.email) || !isEmail(input.email)) {
      console.log('Invlid Email');
      return setIsValid(false);
    }
    if (isEmpty(input.password) || !isEmail(input.email)) {
      console.log('Invlid Password');
      return setIsValid(false);
    }
    if (input.password !== input.confirmPassword) {
      console.log('Password does not match');
      return setIsValid(false);
    }
    setIsValid(true);
    console.log(input);
  };

  return (
    <>
      <h1>With State</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div className="">
          <label htmlFor="">Email</label>
          <input
            type="email"
            name="email"
            onChange={handleInputChage}
            value={input.email}
          />
        </div>
        <div className="">
          <label htmlFor="">Password</label>
          <input
            type="password"
            name="password"
            onChange={handleInputChage}
            value={input.password}
          />
        </div>
        <div className="">
          <label htmlFor="">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={input.confirmPassword}
            onChange={handleInputChage}
          />
        </div>

        <button disabled={!disable}>Submit</button>
      </form>
    </>
  );
}

export default WithState;
