import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import { signUp } from '../../store/session';
import styles from "../auth/SignUpForm.module.css"

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  
  const onSignUp = async (e) => {
    e.preventDefault();
    let validations = []
    if (username.length <4 || username.length > 25) {
      validations.push("Username: username should be in between 4 and 24 characters")
    }
    if(password.length < 6 || password.length > 25){
      validations.push("Password: password should be in between 6 and 24 characters")
    }
    if(email.length < 5 || email.length > 25 ){
      validations.push("Email: email should be in between 6 and 24 characters")
    }
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        for (let values in data){
          validations.push(data[values])        
        }        
      }
    }
    else{
      validations.push("password should match repeatPassword")
    }
    if(validations.length >0) setErrors(validations)
  };
  function handleLogin() {
    history.push('/login')
  }
  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className={styles.mainContainer}>

      <div className={styles.mainDiv}>

        <form onSubmit={onSignUp}>
          <div className={styles.errorMessage}>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div>
            <div className={styles.innerDiv}>
              <input
                className={styles.input}
                type='text'
                name='username'
                onChange={updateUsername}
                value={username}
                placeholder="Username"
              ></input>
            </div>
            <div>

              <input
                className={styles.input}
                type='text'
                name='email'
                onChange={updateEmail}
                value={email}
                placeholder="Email"
              ></input>
            </div>
            <div>

              <input className={styles.input}
                type='password'
                name='password'
                onChange={updatePassword}
                value={password}
                placeholder="Password"
              ></input>
            </div>
            <div>

              <input
                className={styles.input}
                type='password'
                name='repeat_password'
                onChange={updateRepeatPassword}
                value={repeatPassword}
                required={true}
                placeholder="Repeat Password"
              ></input>
            </div>
          </div>
          <div className={styles.innerDiv}>
            <button type='submit' className={styles.button}>Sign Up</button>
          </div>
        </form>
      </div>
      <div className={styles.loginContainer}>
        <div className={styles.loginDiv}>
          <h1 className={styles.headingText}> Already have an account?  </h1>
        </div>
        <div>
          <button className={styles.loginButton} onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
