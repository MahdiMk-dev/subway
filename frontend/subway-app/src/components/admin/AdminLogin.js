import '../../styles/admin/adminlogin.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';


function AdminLogin() {


  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
      const response = await fetch('http://localhost:8000/api/adminlogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if(data.status=='success'){
        alert('loggedin successfully')
        localStorage.setItem('admintoken', data.token);
        localStorage.setItem('usertype', data.type);
        window.location.href='/admin'
      }
      else{
        alert(data.message)
      }
      console.log(data); // Handle the response data here
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
   <div className="wrapper-admin">
  <div className="container-admin">
    <div className="col-left-admin">
      <div className="login-text-admin">
        <h2>Welcome Back</h2>
      </div>
    </div>
    <div className="col-right-admin">
      <div className="login-form-admin">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className='admin-form'>
          <p>
            <label>Username or email address<span>*</span></label>
            <input type="text" placeholder="Email" id="email" required/>
          </p>
          <p>
            <label>Password<span>*</span></label>
            <input type="password" placeholder="Password" id="password" required/>
          </p>
          <p>
            <input type="submit" value="Sign In" />
          </p>
          <p>
            <a href="">Forget Password?</a>
          </p>
        </form>
      </div>
    </div>
  </div>
</div>
  );
}
export default AdminLogin;