import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <div className='navigation-bar'>
    <ul>
      <li>
        <NavLink exact to="/">
          <img src='https://i.imgur.com/pcQ7lcp.png' className='home-logo'></img>
          </NavLink>
          </li>

          <div className='nav-bar-right-side'>
            <li>
        <NavLink className='host-spot' to={'/spots/new'}>Become a Host</NavLink>
        </li>
        <li>
        {isLoaded && sessionLinks}
      </li>
      </div>
    </ul>
    </div>
  );
}

export default Navigation;
