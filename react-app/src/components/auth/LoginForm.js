import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import styles from "../auth/LoginForm.module.css"
import SignUpForm from './SignUpForm';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  function handleSignUp(){
    history.push('/sign-up')
  }

  return (
    <div className={styles.mainContainer}>

      <div className={styles.mainDiv}>

        <form className={styles.form} onSubmit={onLogin}>
          <div className={styles.errorMessage}>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className={styles.innerDiv}>

            <input
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
              className={styles.input}
            />
          </div>
          <div className={styles.innerDiv}>

            <input
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
              className={styles.input}
            />

          </div>
          <div className={styles.innerDiv}>
            <button className={styles.button} type='submit'>Login</button>
          </div>
        </form>
      </div>
      <div className={styles.signUpContainer}>
        <div className={styles.signUpDiv}>
  
            <h1 className={styles.headingText}> New Here ?  </h1>
            <h3 className={styles.subHeadingText}> Sign Up and play Ludo</h3>
  
        </div>
        <div>
          <button className={styles.signUpButton} onClick={handleSignUp}>Signup</button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
