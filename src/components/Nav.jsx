import { Link, useNavigate } from "react-router-dom";
import "../styles/Nav.css";

function Nav({ search = "", setSearch }) {

  const navigate = useNavigate();

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
  );


  const handleSearch = (e) => {

    const value = e.target.value;

    setSearch(value);

    navigate("/products");

  };
const handleLogout = () => {

    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");

    alert("Logged Out Successfully 👋");

    navigate("/");

    window.location.reload();

  };
return (

    <nav className="navbar">

     <div className="logo">

        <Link to="/">

          <h2>MegaMart</h2>

        </Link>

      </div>

      <div className="search-box">

        <input

          type="text"

          placeholder="Search products..."

          value={search}

          onChange={handleSearch}

        />

      </div>

    <ul className="nav-links">
        <li>
          <Link to="/mens">
            Men's
          </Link>
        </li>

        <li>
          <Link to="/womens">
            Women's
          </Link>
        </li>


        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/home-living">
            Home Living
          </Link>
        </li>

        <li>
          <Link to="/beauty">
            Beauty
          </Link>
        </li>

        <li>
          <Link to="/genz">
            Gen Z
          </Link>
        </li>



        <li>
          <Link to="/products">Products</Link>
        </li>


        <li>
          <Link to="/wishlist">
            Wishlist ❤️
          </Link>
        </li>


        <li>
          <Link to="/cart">
            Cart 🛒
          </Link>
        </li>


        <li>
          <Link to="/orders">
            Orders
          </Link>
        </li>


        <li>
          <Link to="/contact">
            Contact
          </Link>
        </li>


        <li>
          <Link to="/help">
            Help
          </Link>
        </li>

        <li>
          <Link to="/admin" className="admin-link">
            Admin
          </Link>
        </li>
     {!currentUser ? (

          <li>
            <Link to="/login">
              Login
            </Link>
          </li>
        ) : (

          <li>

            {/* <span className="user-name">

              {currentUser.name}

            </span> */}
            <span className="user-name">
              👤 {currentUser.name}
            </span>

          </li>

        )}

        <li>

          <Link to="/register">

            Register

          </Link>

        </li>


        {currentUser && (

          <li>

            <button

              className="logout-btn"

              onClick={handleLogout}

            >

              Logout

            </button>

          </li>

        )}

     </ul>
    </nav>

  );

}


export default Nav;