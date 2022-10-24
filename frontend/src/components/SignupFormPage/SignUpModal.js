import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupFormPage from '.';

function SignUpFormModal({setShowSignup, signup}) {//pass in setshowsignup and signup as prop
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* <button className="account-button" onClick={(e) => (setShowModal(true), e.stopPropagation())}>Sign Up</button> */}
      {signup && (
        <Modal onClose={() => setShowSignup(false)}>
          <SignupFormPage setShowSignup={setShowSignup}/>
        </Modal>
      )}
    </>
  );
}

export default SignUpFormModal;
