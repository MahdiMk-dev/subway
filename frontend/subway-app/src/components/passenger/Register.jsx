import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
  faEnvelope,
  faUser,
  faLock,
  faCalendar,
  faHome,
  faVenusMars,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import "../../styles/login.css";
import "../../styles/utilities.css";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "//localhost:8000/api/signup";

const Register = () => {
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();

  const [first_name, setUser] = useState("");

  const [last_name, setLast] = useState("");
  const [dob, SetDOB] = useState("");
  const [gender, Setgender] = useState("");

  const [email, setEmail] = useState("");

  const [phone_number, setPhone] = useState("");
  const [city, setCity] = useState("");

  const [password, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
    setValidMatch(password === matchPwd);
  }, [password, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [password, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const v2 = PWD_REGEX.test(password);
    if (!v2) {
      setErrMsg("Invalid Entry");
      return;
    }

    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({
          first_name,
          last_name,
          password,
          email,
          phone_number,
          city,
          dob,
          gender,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            withCredentials: true,
          },
        }
      );
      setSuccess(true);
      setUser("");
      setPwd("");
      setMatchPwd("");
      localStorage.setItem("login", true);
      localStorage.setItem("userID", response.data.user.id);
      navigate("/profile");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      <Navbar />
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
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-inputs space-between gap-2">
                <div>
                  <div className="float row">
                    <FontAwesomeIcon icon={faEnvelope} className="icon" />

                    <input
                      type="email"
                      id="email"
                      ref={userRef}
                      autoComplete="off"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      required
                      aria-describedby="uidnote"
                    />
                  </div>
                  <div className="float row">
                    <FontAwesomeIcon icon={faUser} className="icon" />

                    <input
                      type="text"
                      id="First Name"
                      ref={userRef}
                      autoComplete="off"
                      onChange={(e) => setUser(e.target.value)}
                      value={first_name}
                      required
                      aria-describedby="uidnote"
                    />
                  </div>
                  <div className="float row">
                    <FontAwesomeIcon icon={faUser} className="icon" />

                    <input
                      type="text"
                      id="Last Name"
                      ref={userRef}
                      autoComplete="off"
                      onChange={(e) => setLast(e.target.value)}
                      value={last_name}
                      required
                      aria-describedby="uidnote"
                    />
                  </div>
                  <div className="float row">
                    <FontAwesomeIcon icon={faVenusMars} className="icon" />

                    <input
                      type="text"
                      id="gender"
                      ref={userRef}
                      autoComplete="off"
                      onChange={(e) => Setgender(e.target.value)}
                      value={gender}
                      required
                      aria-describedby="uidnote"
                    />
                  </div>
                  <div className="float row">
                    <FontAwesomeIcon icon={faCalendar} className="icon" />

                    <input
                      type="date"
                      id="Dob"
                      ref={userRef}
                      autoComplete="off"
                      onChange={(e) => SetDOB(e.target.value)}
                      value={dob}
                      required
                      aria-describedby="uidnote"
                    />
                  </div>
                </div>
                <div>
                  <div className="float row">
                    <FontAwesomeIcon icon={faPhone} className="icon" />

                    <input
                      type="text"
                      id="Phone Number"
                      ref={userRef}
                      autoComplete="off"
                      onChange={(e) => setPhone(e.target.value)}
                      value={phone_number}
                      required
                    />
                  </div>
                  <div className="float row">
                    <FontAwesomeIcon icon={faHome} className="icon" />

                    <input
                      type="text"
                      id="City name"
                      ref={userRef}
                      autoComplete="off"
                      onChange={(e) => setCity(e.target.value)}
                      value={city}
                      required
                    />
                  </div>
                  <div className="float row">
                    <FontAwesomeIcon icon={faLock} className="icon" />

                    <label htmlFor="password">
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
                      Must include uppercase and lowercase letters, a number and
                      a special character.
                      <br />
                      Allowed special characters:{" "}
                      <span aria-label="exclamation mark">!</span>{" "}
                      <span aria-label="at symbol">@</span>{" "}
                      <span aria-label="hashtag">#</span>{" "}
                      <span aria-label="dollar sign">$</span>{" "}
                      <span aria-label="percent">%</span>
                    </p>
                  </div>
                  <div className="float row">
                    <FontAwesomeIcon icon={faLock} className="icon" />
                    <label htmlFor="confirm_pwd">
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