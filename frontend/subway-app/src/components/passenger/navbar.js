import "../../styles/navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div >
      <header >
        <nav className="passenger">
          <Link to="/"> Home</Link>
          <Link to="/Branches">Branches</Link>
          <Link to="/Login">Login</Link>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;