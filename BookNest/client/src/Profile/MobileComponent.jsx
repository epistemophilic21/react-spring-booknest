import { PiWarningCircleDuotone } from "../imports";
function MobileComponent({ userData, handleChange, isEditing, errors }) {
  return (
    <>
      <div className="mb-3">
        <h6 className="profile-field-label">Phone Number</h6>
        <input
          type="tel"
          className="form-control inputBox profile-input"
          name="mobileNumber"
          placeholder="Enter your phone number"
          value={userData.mobileNumber || ""}
          onChange={handleChange}
          disabled={!isEditing}
        />
        {errors.mobileNumber && (
          <div className="alert alert-danger mt-2" role="alert">
            {errors.mobileNumber}{" "}
            <span>
              <PiWarningCircleDuotone style={{ fontSize: "22px" }} />
            </span>
          </div>
        )}
      </div>
    </>
  );
}
export default MobileComponent;
