import React, { useState } from 'react';
import axios from 'axios';
import {Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/v1/user/login/', {
        user: user,
        password: password
      });

      // Assuming your backend returns the user object with a 'role' field
      const { role } = response.data;
      const {_id} = response.data;
      // Save username and password to local storage (not recommended for real-world applications)
      localStorage.setItem('username', user);
      localStorage.setItem('role', role);
      localStorage.setItem('req', _id);
      // Redirect based on role
      if (role === true) {
        navigate("/create");
      } else {
        navigate("/"); // Redirect to another page if not an admin
      }

      // You can redirect the user to another page or do something else here upon successful login
      window.location.reload();
    } catch (error) {
      setError('Wrong username or password');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-form" style={{ width: "300px", margin: "50px auto", fontSize: "15px" }}>
      <form onSubmit={handleSubmit} style={{ marginBottom: "15px", background: "#f7f7f7", boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.3)", padding: "30px" }}>
        <h2 className="text-center" style={{ margin: "0 0 15px" }}>Log in</h2>
        <div className="form-group">
          <input type="text" style={{ minHeight: "38px", borderRadius: "2px", margin: "10px 0" }} className="form-control" placeholder="Username" onChange={(e) => setUser(e.target.value)} required="required" />
        </div>
        <div className="form-group">
          <input type="password" style={{ minHeight: "38px", borderRadius: "2px", margin: "10px 0" }} className="form-control" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required="required" />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary btn-block" style={{ minHeight: "38px", borderRadius: "2px", fontSize: "15px", fontWeight: "bold", width: "100%", marginBottom: "5px" }}>Log in</button>
        </div>
        <div className="clearfix">
          <label className="float-left form-check-label"><input type="checkbox" /> Remember me</label>
          <Link to="" className="float-right">Forgot Password?</Link>
        </div>
      </form>
      <p className="text-center"><Link to="/sign" style={{ textDecoration: "none" }}>Create an Account</Link></p>
      <div>{error}</div>
    </div>
  );
};

export default LoginForm;
