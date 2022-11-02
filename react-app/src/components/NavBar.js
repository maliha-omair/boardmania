
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import styles from "./NavBar.module.css"
import logo from "../assets/logo.png"

const NavBar = () => {
  return (
    <div className={styles.mainNav}>
      <div>
        <NavLink to='/' exact={true} activeClassName='active' className={styles.navLink}>
              <img src={logo} className={styles.logoImage}></img>
        </NavLink>
      </div>
       
      {/* <li className={styles.list}>
          <NavLink to='/users' exact={true} activeClassName='active' className={styles.navLink}>
            Users
          </NavLink>
        </li> */}
      <div className={styles.linkDiv}>
      
        <div className={styles.linkedIcon}><a className={styles.linkedIcon} href="https://www.linkedin.com/in/maliha-omair/" target="_blank"><i class="fa-brands fa-linkedin"></i></a></div>
        <div className={styles.gitHubIcon}><a className={styles.gitHubIcon} href="https://github.com/maliha-omair" target="_blank"><i class="fa-brands fa-github"></i></a></div>
        <div className={styles.loginButton}> <LogoutButton /></div>
       
      </div>

    </div>
  );
}

export default NavBar;
