
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import styles from "./NavBar.module.css"
import logo from "../assets/logo.png"
import { useSelector } from 'react-redux';

const NavBar = () => {
  const user = useSelector(state=>state.session.user)
  return user && (
    <div className={styles.mainNav}>
      <div>
        <NavLink to='/' exact={true} activeClassName='active' className={styles.navLink}>
              <img src={logo} className={styles.logoImage}></img>
        </NavLink>
      </div>
       <div className={styles.userName}> HEY {user.username.toUpperCase()} !</div>
      <div className={styles.linkDiv}>
      
        <div className={styles.linkedIcon}><a className={styles.linkedIcon} href="https://www.linkedin.com/in/maliha-omair/" target="_blank"><i class="fa-brands fa-linkedin"></i></a></div>
        <div className={styles.gitHubIcon}><a className={styles.gitHubIcon} href="https://github.com/maliha-omair" target="_blank"><i class="fa-brands fa-github"></i></a></div>
        <div className={styles.loginButton}> <LogoutButton /></div>
       
      </div>

    </div>
  );
}

export default NavBar;
