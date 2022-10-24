import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

function LoginFormModal({setLogin, login}) { //pass in setlogin and login as prop
  const [showModal, setShowModal] = useState(false);

  return (
    <>
       {/* <button className="login-button" onClick={(e) => (setShowModal(true), e.stopPropagation())}>Log In</button> */}
      {login && (
        <Modal onClose={() => setLogin(false)}>
          <LoginForm setLogin={setLogin}/>
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
