import { PiWarningCircleDuotone } from "../imports";
function AddressComponent({ userData, handleChange, isEditing, errors }) {
  return (
    <>
      {" "}
      <div className="mb-3">
        <h6>Address:</h6>
        <textarea
          className="form-control inputBox"
          name="address"
          placeholder="Enter your address"
          rows="3"
          value={userData.address}
          onChange={handleChange}
          disabled={!isEditing}
          style={{ backgroundColor: "white" }}
        />
        {errors.address && (
          <div className="alert alert-danger mt-2" role="alert">
            {errors.address}{" "}
            <span>
              <PiWarningCircleDuotone style={{ fontSize: "22px" }} />
            </span>
          </div>
        )}
      </div>
    </>
  );
}
export default AddressComponent;
