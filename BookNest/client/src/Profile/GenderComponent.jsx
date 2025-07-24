import { PiWarningCircleDuotone } from "../imports";
function GenderComponent({ userData, handleChange, isEditing, errors }) {
  return (
    <>
      {" "}
      <div className="mb-3">
        <h6>Gender:</h6>
        <select
          className="form-select inputBox"
          name="gender"
          value={userData.gender}
          onChange={handleChange}
          disabled={!isEditing}
          style={{ backgroundColor: "white" }}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Others">Others</option>
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
