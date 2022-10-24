import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

function LoginFormModal() { //pass in setlogin and login as prop
  const [showModal, setShowModal] = useState(false);

  return (
    <>
       <button className="login-button" onClick={(e) => (setShowModal(true), e.stopPropagation())}>Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
