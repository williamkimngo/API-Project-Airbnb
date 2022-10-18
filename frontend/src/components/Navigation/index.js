import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import NoUserButton from './NoUserButton';
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
      <NoUserButton/>
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
            <NavLink className="host-a-spot" to='/spots/new'>Host a Spot</NavLink>
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
