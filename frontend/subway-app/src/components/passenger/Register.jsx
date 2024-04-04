import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../../api/axios';
import { Link } from "react-router-dom";
import '../../styles/login.css';

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = 'http://localhost:8000/api/signup';

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [validFirstName, setValidFirstName] = useState(false);

    const [lastName, setLastName] = useState('');
    const [validLastName, setValidLastName] = useState(false);

    const [dob, setDob] = useState('');
    const [validDob, setValidDob] = useState(false);

    const [phoneNumber, setPhoneNumber] = useState('');
    const [validPhoneNumber, setValidPhoneNumber] = useState(false);

    const [city, setCity] = useState('');
    const [validCity, setValidCity] = useState(false);

    const [gender, setGender] = useState('Male');

    const [imageURL, setImageURL] = useState('');

    const [balance, setBalance] = useState('');

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState('');
    const [validConfirmPassword, setValidConfirmPassword] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setValidEmail(validateEmail(email));
    }, [email]);

    useEffect(() => {
        setValidFirstName(firstName.trim().length > 0);
    }, [firstName]);

    useEffect(() => {
        setValidLastName(lastName.trim().length > 0);
    }, [lastName]);

    useEffect(() => {
        setValidDob(dob.trim().length > 0);
    }, [dob]);

    useEffect(() => {
        setValidPhoneNumber(phoneNumber.trim().length > 0);
    }, [phoneNumber]);

    useEffect(() => {
        setValidCity(city.trim().length > 0);
    }, [city]);

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password));
    }, [password]);

    useEffect(() => {
        setValidConfirmPassword(confirmPassword === password);
    }, [confirmPassword, password]);

    useEffect(() => {
        setErrMsg('');
    }, [email, firstName, lastName, dob, phoneNumber, city, gender, imageURL, balance, password, confirmPassword]);

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validEmail || !validFirstName || !validLastName || !validDob || !validPhoneNumber || !validCity || !validPassword || !validConfirmPassword) {
            setErrMsg("Please fill out all fields correctly.");
            return;
        }

        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ email, first_name: firstName, last_name: lastName, dob, phone_number: phoneNumber, city, gender, image_url: imageURL || null, balance: balance || null, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            setSuccess(true);
            setEmail('');
            setFirstName('');
            setLastName('');
            setDob('');
            setPhoneNumber('');
            setCity('');
            setGender('Male');
            setImageURL('');
            setBalance('');
            setPassword('');
            setConfirmPassword('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Email Already Registered');
            } else {
                setErrMsg('Registration Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <Link to="/login">Sign In</Link>
                    </p>
                </section>
            ) : (
                <div className="Passengerlogin">
                    <section>
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        <h1>Register</h1>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                                aria-invalid={!validEmail}
                            />
                            <label htmlFor="first_name">First Name:</label>
                            <input
                                type="text"
                                id="first_name"
                                autoComplete="off"
                                onChange={(e) => setFirstName(e.target.value)}
                                value={firstName}
                                required
                                aria-invalid={!validFirstName}
                            />
                            <label htmlFor="last_name">Last Name:</label>
                            <input
                                type="text"
                                id="last_name"
                                autoComplete="off"
                                onChange={(e) => setLastName(e.target.value)}
                                value={lastName}
                                required
                                aria-invalid={!validLastName}
                            />
                            <label htmlFor="dob">Date of Birth:</label>
                            <input
                                type="date"
                                id="dob"
                                onChange={(e) => setDob(e.target.value)}
                                value={dob}
                                required
                                aria-invalid={!validDob}
                            />
                            <label htmlFor="phone_number">Phone Number:</label>
                            <input
                                type="tel"
                                id="phone_number"
                                autoComplete="off"
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                value={phoneNumber}
                                required
                                aria-invalid={!validPhoneNumber}
                            />
                            <label htmlFor="city">City:</label>
                            <input
                                type="text"
                                id="city"
                                autoComplete="off"
                                onChange={(e) => setCity(e.target.value)}
                                value={city}
                                required
                                aria-invalid={!validCity}
                            />
                            <label htmlFor="gender">Gender:</label>
                            <select
                                id="gender"
                                onChange={(e) => setGender(e.target.value)}
                                value={gender}
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                            <label htmlFor="image_url">Image URL:</label>
                            <input
                                type="text"
                                id="image_url"
                                autoComplete="off"
                                onChange={(e) => setImageURL(e.target.value)}
                                value={imageURL}
                            />
                            <label htmlFor="balance">Balance:</label>
                            <input
                                type="number"
                                id="balance"
                                onChange={(e) => setBalance(e.target.value)}
                                value={balance}
                            />
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                                aria-invalid={!validPassword}
                            />
                            <label htmlFor="confirm_password">Confirm Password:</label>
                            <input
                                type="password"
                                id="confirm_password"
                                autoComplete="new-password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                value={confirmPassword}
                                required
                                aria-invalid={!validConfirmPassword}
                            />
                            <button disabled={!validEmail || !validFirstName || !validLastName || !validDob || !validPhoneNumber || !validCity || !validPassword || !validConfirmPassword}>Sign Up</button>
                        </form>
                        <p>
                            Already registered?<br />
                            <span className="line">
                                <Link to="/login">Sign In</Link>
                            </span>
                        </p>
                    </section>
                </div>
                <div>
                  <label htmlFor="Phone Number">Phone Number:</label>
                  <input
                    type="text"
                    id="Phone Number"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone_number}
                    required
                  />
                  <label htmlFor="City name">City name:</label>
                  <input
                    type="text"
                    id="City name"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                    required
                  />

                  <label htmlFor="password">
                    Password:
                    <FontAwesomeIcon
                      icon={faCheck}
                      className={validPwd ? "valid" : "hide"}
                    />
                    <FontAwesomeIcon
                      icon={faTimes}
                      className={validPwd || !password ? "hide" : "invalid"}
                    />
                  </label>
                  <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={password}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                  />
                  <p
                    id="pwdnote"
                    className={
                      pwdFocus && !validPwd ? "instructions" : "offscreen"
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    8 to 24 characters.
                    <br />
                    Must include uppercase and lowercase letters, a number and a
                    special character.
                    <br />
                    Allowed special characters:{" "}
                    <span aria-label="exclamation mark">!</span>{" "}
                    <span aria-label="at symbol">@</span>{" "}
                    <span aria-label="hashtag">#</span>{" "}
                    <span aria-label="dollar sign">$</span>{" "}
                    <span aria-label="percent">%</span>
                  </p>

                  <label htmlFor="confirm_pwd">
                    Confirm Password:
                    <FontAwesomeIcon
                      icon={faCheck}
                      className={validMatch && matchPwd ? "valid" : "hide"}
                    />
                    <FontAwesomeIcon
                      icon={faTimes}
                      className={validMatch || !matchPwd ? "hide" : "invalid"}
                    />
                  </label>
                  <input
                    type="password"
                    id="confirm_pwd"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    value={matchPwd}
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                  />
                  <p
                    id="confirmnote"
                    className={
                      matchFocus && !validMatch ? "instructions" : "offscreen"
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must match the first password input field.
                  </p>
                </div>
              </div>

              <button disabled={!validPwd || !validMatch}>Sign Up</button>
            </form>
            <p>
              Already registered?
              <br />
              <span className="line">
                <Link to="/login">Sign In</Link>
              </span>
            </p>
          </section>
        </div>
      )}
    </>
  );
};

export default Register;
