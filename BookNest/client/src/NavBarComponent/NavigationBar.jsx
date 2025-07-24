import {
  Link,
  FaPowerOff,
  useContext,
  AuthContext,
  CartContext,
} from "../imports";

function NavigationBar() {
  const { logout } = useContext(AuthContext);
  const { clearCart } = useContext(CartContext);

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{ background: "#364fc7" }}
      >
        <div className="container-fluid">
          <a
            className="navbar-brand disabled-link"
            style={{ fontWeight:"500", letterSpacing:"1px"}}
          >
            Book Nest
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item" style={{ marginRight: "2rem" }}>
                <Link to="/home" className="nav-link active">
                  Home
                </Link>
              </li>
              <li className="nav-item" style={{ marginRight: "2rem" }}>
                <Link to="/cart" className="nav-link">
                  Cart
                </Link>
              </li>
              <li className="nav-item" style={{ marginRight: "2rem" }}>
                <Link to="/user" className="nav-link">
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/"
                  className="nav-link"
                  onClick={() => logout(clearCart)}
                >
                  <FaPowerOff style={{ fontSize: "21px" }} />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
export default NavigationBar;
