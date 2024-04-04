// Login.jsx

import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../../styles/login.css';
const LOGIN_URL = 'http://localhost:8000/api/login';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("passenger");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

    const LOGIN_URL = 'http://localhost:8000/api/login'; // Update this with your actual API URL

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post(LOGIN_URL, {
                email,
                password
            });
    
            const { token, passenger } = response.data;
    
            localStorage.setItem('token', token);
            
            navigate('/profile');
        } catch (err) {
            if (err.response && err.response.status === 401) {
                setErrMsg('Invalid email or password');
            } else {
                setErrMsg('An error occurred. Please try again later.');
            }
        }
    };
    


  return (
    <div>
      <Navbar />
      <div className="Passengerlogin">
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Login</h1>
          <form onSubmit={handleSubmit} className="login-inputs">
            <label>Email:</label>
            <input
              type="email"
              id="email"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <label>Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <label>User Type:</label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="passenger">Passenger</option>
              <option
                value="branch"
                onClick={() => {
                  navigate("/admin_login");
                }}
              >
                Branch
              </option>
              <option
                value="headquarters"
                onClick={() => {
                  navigate("/admin_login");
                }}
              >
                Headquarters
              </option>
            </select>
            <button type="submit">Login</button>
          </form>
          <p>
            Need an Account?
            <br />
            <span className="line">
              <Link to="/register">Sign Up</Link>
            </span>
          </p>
        </section>
      </div>
    </div>
  );
};

export default Login;
