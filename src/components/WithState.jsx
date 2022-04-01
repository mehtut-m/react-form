import React, { useState } from 'react';

import { validEmail, validPassword, passwordMatch } from '../utils/validation';

function WithState() {
  const [input, setInput] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { email, password, confirmPassword } = input;

  const isValid =
    validEmail(email) &&
    validPassword(password) &&
    passwordMatch(password, confirmPassword);

  const handleInputChage = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      console.log(input);
    }
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

        <button disabled={!isValid}>Submit</button>
      </form>
    </>
  );
}

export default WithState;
