import {
  useContext,
  useState,
  AuthContext,
  RiShieldUserFill,
  NavigationBar,
  useUpdateClient,
  getClientProfile,
  ButtonComponent,
  GenderComponent,
  AddressComponent,
  MobileComponent,
} from "../imports";

function UserProfile() {
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const { userData, loading, setUserData } = useUpdateClient(user);
  console.log(user);
  if (loading) {
    return (
      <div className="text-center p-5" style={{ marginTop: "190px" }}>
        <div
          className="spinner-border text-primary"
          role="status"
          style={{ width: "4rem", height: "4rem" }}
        ></div>
      </div>
    );
  }

  if (!user) {
    return <div className="container mt-5">User not found. Please log in.</div>;
  }

  const handleUpdateClick = () => {
    setIsEditing(true);
    setErrors({});
  };

  const validateInputs = () => {
    let tempErrors = {};
    if (!userData.gender) tempErrors.gender = "Gender is required";
    if (!userData.address.trim()) tempErrors.address = "Address is required";
    if (!userData.mobileNumber.trim())
      tempErrors.mobileNumber = "Phone number is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSaveClick = async () => {
    if (!validateInputs()) return;
    await getClientProfile(user, userData, setIsEditing);
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <NavigationBar />
      <div className="container mt-3">
        <div className="card border-0">
          <div className="card-body">
            <p className="card-title text-center">
              <RiShieldUserFill
                style={{ fontSize: "52px", color: "#1864ab" }}
              />
            </p>

            <div className="text-center my-4">
              <h3>Greetings, {userData?.clientName || "No Name Provided"}!</h3>
            </div>

            {/* Gender Section */}
            <GenderComponent
              userData={userData}
              handleChange={handleChange}
              isEditing={isEditing}
              errors={errors}
            />

            {/* Email Section */}
            <div className="mb-3">
              <h6>Email:</h6>
              <input
                type="email"
                className="form-control inputBox"
                name="clientEmail"
                value={userData.clientEmail || ""}
                disabled
                style={{ backgroundColor: "white" }}
              />
            </div>

            {/* Address Section */}
            <AddressComponent
              userData={userData}
              handleChange={handleChange}
              isEditing={isEditing}
              errors={errors}
            />

            {/* Phone Number Section */}
            <MobileComponent
              userData={userData}
              handleChange={handleChange}
              isEditing={isEditing}
              errors={errors}
            />

            {/* Buttons */}
            <ButtonComponent
              handleSaveClick={handleSaveClick}
              handleUpdateClick={handleUpdateClick}
              isEditing={isEditing}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
