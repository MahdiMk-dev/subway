import '../../styles/admin/adminlogin.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';


function passLogin() {


  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
      const response = await fetch('http://localhost:8000/api/passLogin', {
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
        window.location.href='/profile'
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
   <div class="wrapper-admin">
  <div class="container-admin">
    <div class="col-left-admin">
      <div class="login-text-admin">
        <h2>Welcome Back</h2>
      </div>
    </div>
    <div class="col-right-admin">
      <div class="login-form-admin">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <p>
            <label>Username or email address<span>*</span></label>
            <input type="text" placeholder="Email" id="email" required/>
          </p>
          <p>
            <label>Password<span>*</span></label>
            <input type="password" placeholder="Password" id="password" required/>
          </p>
          <p>
            <input type="submit" value="Sing In" />
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
export default passLogin;