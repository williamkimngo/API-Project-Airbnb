import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import NoUserButton from './NoUserButton';
import './Navigation.css';
import SignUpFormModal from '../SignupFormPage/SignUpModal';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  const [signup, setShowSignup] = useState(false)
  const [login, setLogin] = useState(false)

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />

    );
  } else {
    sessionLinks = (
      <div className='navContent'>

      <NoUserButton setShowSignup={setShowSignup} setLogin={setLogin}/>
    </div >
    );
  }

  return (
    <div className='nav-bar'>
    <ul className="nav-list">
      <li>
        <NavLink exact to="/">
          <img src='https://i.imgur.com/pcQ7lcp.png' alt='logo' className='home-logo'></img>
          </NavLink>
          </li>

          <div className='right-nav-items'>
          <li>
            <NavLink className="host-spot" to='/spots/new'>Become a Host</NavLink>
          </li>
          {signup && <SignUpFormModal setShowSignup={setShowSignup} signup={signup} />}
          {login && <LoginFormModal setLogin={setLogin} login={login} />}
          <li>
            {isLoaded && sessionLinks}
          </li>
        </div>
      </ul>
    </div>
  );
}

export default Navigation;
