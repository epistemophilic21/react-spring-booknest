import { MdWrongLocation, Link } from "../imports";
import "./LocationNotFound.css";

function LocationNotFound() {
  return (
    <div className="location-not-found-wrap">
      <div className="location-not-found-card">
        <div className="location-icon-box">
          <MdWrongLocation className="location-not-found-icon" />
        </div>

        <h4>Location Not Found</h4>
        <p>
          We could not detect a valid delivery location. Update your profile
          address to continue checkout.
        </p>

        <Link to="/user" className="location-action-btn">
          Update Profile
        </Link>
      </div>
    </div>
  );
}

export default LocationNotFound;
