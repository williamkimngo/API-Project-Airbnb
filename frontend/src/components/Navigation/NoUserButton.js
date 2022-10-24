import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Link, NavLink } from "react-router-dom";
import * as sessionActions from '../../store/session';
import LoginFormModal from "../LoginFormModal";
import SignUpModal from "../SignupFormPage/SignUpModal";

function NoUserButton({ user, setShowSignup, setLogin }) { //pass setlogin and setshowsingup as props
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

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

  return (
    <>
      <button onClick={openMenu} className="profile-button">
        <i className="fas fa-bars" />
        <i className="fas fa-user-circle" />
      </button>
      {showMenu && (
        <ul className="profile-dropdown-no-user">
         <li>
        
         <button className="login-button" onClick={() => setLogin(true)}>Log In</button>
         </li>

         <li>

            <button className="account-button" onClick={() => setShowSignup(true)}>Sign Up</button>
         </li>

        </ul>
      )}
    </>
  );
}

export default NoUserButton;
