import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import styles from "../auth/LoginButton.module.css"

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return <button onClick={onLogout} className={styles.loginButton}>Logout</button>;
};

export default LogoutButton;
