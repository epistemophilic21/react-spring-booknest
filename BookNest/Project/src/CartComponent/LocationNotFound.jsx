import { MdWrongLocation } from "react-icons/md";
import { Link } from "react-router-dom";

function LocationNotFound() {
  return (
    <div className="container mt-5">
      <div className="card w-100 ">
        {" "}
        <div className="card-body text-center my-4">
          <h5 className="card-title">
            <MdWrongLocation style={{ fontSize: "90px", color: "#c92a2a" }} />
          </h5>
          <p className="card-text">
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
