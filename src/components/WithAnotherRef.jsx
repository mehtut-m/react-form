import React, { useEffect, useRef } from 'react';
import { validEmail, validPassword, passwordMatch } from '../utils/validation';

function WithState() {
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const confirmRef = useRef(null);
  const submitRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    // formEl.current[e.target.name] = e.target.value;
    console.log(passRef);
  };

  const disableSubmit = () => submitRef.setAttribute('disabled', true);

  return (
    <>
      <h1>With Refs 2</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div className="">
          <label htmlFor="">Email</label>
          <input
            type="email"
            name="email"
            className="email"
            ref={emailRef}
            onChange={handleChange}
          />
        </div>
        <div className="">
          <label htmlFor="">Password</label>
          <input
            type="password"
            name="password"
            className="password"
            ref={passRef}
            onChange={handleChange}
          />
        </div>
        <div className="">
          <label htmlFor="">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            className="confirmPassword"
            onChange={handleChange}
            ref={confirmRef}
          />
        </div>

        <button className="submit-btn" disabled ref={submitRef}>
          Submit
        </button>
      </form>
    </>
  );
}

export default WithState;
