import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import {Link, useHistory} from 'react-router-dom'
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory()

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
  };
  // console.log("USER!!!!!", user)
  return (
    <>
      <button className="profile-button" onClick={openMenu}>
        <i className="fas fa-bars"/>
        <i className="fas fa-user-circle" />
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li className="dropdown-button-account-border">
            <Link className="dropdown-button-account" to={'/current'}>Account</Link>
          </li>
          <li className="dropdown-button-logout">
            <button className="logout-button" onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
