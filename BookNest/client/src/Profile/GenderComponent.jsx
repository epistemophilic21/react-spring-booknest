import { PiWarningCircleDuotone } from "../imports";
function GenderComponent({ userData, handleChange, isEditing, errors }) {
  return (
    <>
      <div className="mb-3">
        <h6 className="profile-field-label">Gender</h6>
        <select
          className="form-select inputBox profile-input"
          name="gender"
          value={userData.gender || ""}
          onChange={handleChange}
          disabled={!isEditing}
        >
          <option value="" disabled>
            Select gender
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
          <option value="Prefer not to say">Prefer not to say</option>
        </select>
        {errors.gender && (
          <div className="alert alert-danger mt-2" role="alert">
            {errors.gender}{" "}
            <span>
              <PiWarningCircleDuotone style={{ fontSize: "22px" }} />
            </span>
          </div>
        )}
      </div>
    </>
  );
}
export default GenderComponent;
