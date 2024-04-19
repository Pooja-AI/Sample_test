import React from 'react';
import { useMsal } from '@azure/msal-react';
import login from './images/Group 3802.svg';
import genaisight from './images/GenAISight.png';
import title from './images/LoginTitle.png';
import './login.css';
import loginNew from './images/LoginNew.svg';
import { loginRequest } from './Auth/authConfig';

const LoginButton = () => {
  const { instance } = useMsal();

  const handleLogin = async () => {
    try {
      console.log("login page")
     instance.loginRedirect({... loginRequest, prompt: 'create'});
      // Handle successful login
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className='main-L'>
              <div className='title-login'>
                <img src={genaisight} />
                <img src={title} />
              </div>
              <button className="login-container-domain" onClick={handleLogin}>
               aaaaaaaaaa
              </button>
            </div>
  );
};

export default LoginButton;