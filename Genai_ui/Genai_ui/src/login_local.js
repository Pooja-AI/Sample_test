import React, { useState } from 'react';
import login from './images/Group 3802.svg';
import user from './images/account_circle_FILL0_wght400_GRAD0_opsz24 1.svg';
import pass from './images/lock_FILL0_wght400_GRAD0_opsz24 1.svg';
import genaisight from './images/GenAISight.png';
import title from './images/LoginTitle.png';
import './login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Check the username and password (you can implement your logic here)
    if (username === 'Admin' && password === 'admin') {
      onLogin(); // Call the callback function to set the login state
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className='main-L'>
      <div className='title-login'>
        <img src={genaisight} />
        <img src={title} />
      </div>
      <div className="login-container">
        <div className='main-login'>
          {/* <img className='acce' src={login} alt="login" /> */}
          <div LOGIN></div>
          <label className='login-label'>Username</label>
          <div className='user-tag'>
            <img className='user-img' src={user} alt="user Logo" />
            <div className="form-group">
              <input
                type="text"
                placeholder='Type your username'
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <label className='login-label'>Password</label>
          <div className='user-tag'>
            <img className='pass-img' src={pass} alt="pass Logo" />
            <div className="form-group">
              <input
                type="password"
                placeholder='Type your password'
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="remember-forgot">
            <a href="#" className='password'>Forgot Password ?</a>
          </div>
          <button onClick={handleLogin} className='button-l'>LOGIN</button>
        </div>
      </div>
      <div>
      </div>
    </div>
  );
};

export default Login;
