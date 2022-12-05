import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import styles from "../auth/LoginForm.module.css"
import image from "../../assets/logo.png"

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [demo, setDemo] = useState(false);

  const onLogin = async (e) => {
    e.preventDefault();
    let validations = []

    if(email.length <=0) validations.push("email is required")
    if(password.length <=0) validations.push("password is required")
    if (demo) {
      const data = await dispatch(login("demo@aa.io", "password"));
    } else {
      const data = await dispatch(login(email, password));
      if (data) {
        validations.push("invalid user")
        // setErrors(data);
      }
    }
    if(validations.length >0){
      setErrors(validations)
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

  function handleSignUp() {
    history.push('/sign-up')
  }

  return (
     
      <div className={styles.mainContainer}>
        <div className={styles.mainDiv}>
          <div className={styles.imageDiv}>
            <img src={image} className={styles.image}></img>
          </div>
          <div className={styles.formDiv}>
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
              <button className={styles.button} type='submit' onClick={() => setDemo(true)}>Demo User</button>
            </div>
          </form>
          </div>
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
