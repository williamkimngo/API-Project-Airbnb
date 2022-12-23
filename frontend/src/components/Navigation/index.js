import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import NoUserButton from './NoUserButton';
import './Navigation.css';
import SignUpFormModal from '../SignupFormPage/SignUpModal';
import SearchBar from './SearchBar';

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
    <>
    <nav className='nav-bar'>
      <div className='navigation-outer'>
    <div className="nav-list">
      {/* <div> */}
        <NavLink exact to="/">
          <img src='https://i.imgur.com/pcQ7lcp.png' alt='logo' className='home-logo'></img>
          </NavLink>
          <SearchBar/>
          {/* </div> */}

          <div className='right-nav-items'>
          <div>
            <NavLink className="host-spot" to='/spots/new'>Become a Host</NavLink>
          </div>
          {signup && <SignUpFormModal setShowSignup={setShowSignup} signup={signup} />}
          {login && <LoginFormModal setLogin={setLogin} login={login} />}
          <div>
            {isLoaded && sessionLinks}
          </div>
        </div>
      </div>
      </div>
    </nav>
    </>
  );
}

export default Navigation;
