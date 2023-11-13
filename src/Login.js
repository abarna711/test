// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
 const navigate = useNavigate();
  const handleLogin = () => {
    
    if (username === 'demo' && password === 'password') {
      navigate('/admin')
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="login container-fulid" style={{marginLeft:"28%",marginTop:"10%",paddingLeft:"150px",paddingTop:"50px",paddingBottom:"50px"}}>
      <h2>Login</h2>
      <form>
        <label>
          Username:<br/>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br /><br/>
        <label>
          Password:<br/>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br /><br/>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
