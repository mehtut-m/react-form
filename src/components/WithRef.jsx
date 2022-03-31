import React, { useEffect, useRef } from 'react';
import { validEmail, validPassword, passwordMatch } from '../utils/validation';

function WithState() {
  const formEl = useRef();
  const btnRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      [...formEl.current.elements].filter((item) => item.tagName === 'INPUT')
    );
  };

  const disableSubmit = () => btnRef.current.setAttribute('disabled', true);

  useEffect(() => {
    const formArr = [...formEl.current.elements];

    const handleChange = (e, index) => {
      const input = formArr[index];

      if (input.name === 'email' && !validEmail(e.target.value)) {
        disableSubmit();
        return;
      }

      const password = formArr.find((item) => item.name === 'password');

      const confirmPassword = formArr.find(
        (item) => item.name === 'confirmPassword'
      );

      if (
        input.name === 'password' &&
        (!validPassword(formArr[index].value) ||
          !passwordMatch(confirmPassword.value, input.value))
      ) {
        disableSubmit();
        return;
      }

      if (
        input.name === 'confirmPassword' &&
        !passwordMatch(password.value, input.value)
      ) {
        disableSubmit();
        return;
      }
      if (
        formArr.filter(
          (item) => item.value.trim() === '' && item.tagName !== 'BUTTON'
        ).length > 0
      ) {
        return disableSubmit();
      }

      btnRef.current.removeAttribute('disabled');
    };

    formArr.forEach((item, index) => {
      if (item.tagName === 'INPUT') {
        item.addEventListener('keyup', (e) => handleChange(e, index));
      }
    });

    return () => {
      formArr.forEach((item, index) => {
        if (item.tagName === 'INPUT') {
          item.removeEventListener('keyup', (e) => handleChange(e, index));
        }
      });
    };
  }, []);

  return (
    <>
      <h1>With Refs</h1>
      <form ref={formEl} onSubmit={handleSubmit} noValidate>
        <div className="">
          <label htmlFor="">Email</label>
          <input type="email" name="email" className="email" />
        </div>
        <div className="">
          <label htmlFor="">Password</label>
          <input type="password" name="password" className="password" />
        </div>
        <div className="">
          <label htmlFor="">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            className="confirmPassword"
          />
        </div>

        <button className="submit-btn" disabled ref={btnRef}>
          Submit
        </button>
      </form>
    </>
  );
}

export default WithState;
