import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8000/v1/user/login?user=${user}&password=${password}`);
      const { token } = response.data;
      // Lưu token vào localStorage hoặc cookie để sử dụng cho các yêu cầu sau này
      localStorage.setItem('token', token);
      // Điều hướng đến trang chính sau khi đăng nhập thành công
      // Thay đổi '/dashboard' thành địa chỉ mong muốn của bạn
      window.location.href = '/dashboard';
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleLogin}>
        <label>
          User:
          <input type="text" value={user} onChange={(e) => setUser(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
