import { PiWarningCircleDuotone } from "../imports";
function MobileComponent({ userData, handleChange, isEditing, errors }) {
  return (
    <>
      <div className="mb-3">
        <h6>Phone Number:</h6>
        <input
          type="tel"
          className="form-control inputBox"
          name="mobileNumber"
          placeholder="Enter your phone number"
          value={userData.mobileNumber}
          onChange={handleChange}
          disabled={!isEditing}
          style={{ backgroundColor: "white" }}
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
