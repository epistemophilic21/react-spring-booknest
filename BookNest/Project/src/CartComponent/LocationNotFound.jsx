import { MdWrongLocation, Link } from "../imports";

function LocationNotFound() {
  return (
    <div className="container mt-5">
      <div className="card w-100 border-0">
        {" "}
        <div className="card-body text-center my-4">
          <h5 className="card-title">
            <MdWrongLocation style={{ fontSize: "90px", color: "#c92a2a" }} />
          </h5>
          <p className="card-text" style={{ color: "red" }}>
            Location not found. Please update your user profile.
          </p>
          <Link to="/user" className="btn btn-primary">
            Take me there
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LocationNotFound;
