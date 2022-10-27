
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import styles from "./NavBar.module.css"

const NavBar = () => {
  return (
    <nav className={styles.mainNav}>
      <div>
        <NavLink to='/' exact={true} activeClassName='active' className={styles.navLink}>
          Home
        </NavLink>
      </div>

      {/* <li className={styles.list}>
          <NavLink to='/users' exact={true} activeClassName='active' className={styles.navLink}>
            Users
          </NavLink>
        </li> */}
      <div className={styles.loginButton}>
        <LogoutButton />
      </div>

    </nav>
  );
}

export default NavBar;
