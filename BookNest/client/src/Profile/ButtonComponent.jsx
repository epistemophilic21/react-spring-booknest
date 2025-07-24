import { Link } from "../imports";

function ButtonComponent({ handleSaveClick, handleUpdateClick, isEditing }) {
  return (
    <>
      {" "}
      <div className="text-center mt-4">
        <div className="d-flex justify-content-center gap-3 mt-4">
          {isEditing ? (
            <button
              type="button"
              className="btn btn-success"
              onClick={handleSaveClick}
            >
              Save Profile
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleUpdateClick}
            >
              Update Profile
            </button>
          )}
          <button type="button" className="btn btn-secondary">
            <Link to="/cart" style={{ textDecoration: "none", color: "white" }}>
              Back
            </Link>
          </button>
        </div>
      </div>
    </>
  );
}
export default ButtonComponent;
