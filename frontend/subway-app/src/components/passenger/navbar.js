import { useEffect, useState } from "react";
import "../../styles/navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  const id = localStorage.getItem("ID")
  const [isLogin, Setlogin] = useState(false)
  useEffect(()=>{
    const login = localStorage.getItem("login")
    if(login != null){
      Setlogin(true)
    }
  },[])
  return (
    <div >
      <header >
        <nav className="passenger">
          <Link to="/"> Home</Link>
          <Link to="/Map">View Map</Link>
          {isLogin ? (<Link to={"/profile/userId:"+id}>Profile</Link>):
          (<Link to="/Login">Login</Link>)}
        </nav>
      </header>
    </div>
  );
}

export default Navbar;