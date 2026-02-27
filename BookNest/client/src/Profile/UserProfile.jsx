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
  const [isEditing, setIsEditing] = useState(true);
  const [errors, setErrors] = useState({});
  const { userData, loading, setUserData } = useUpdateClient(user);
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
    if (!userData.address?.trim()) tempErrors.address = "Address is required";
    if (!userData.mobileNumber?.trim())
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

      <div className="profile-page">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="card border-0 rounded-5 profile-card">
                <div className="card-body px-5 py-5">

                {/* Profile Icon */}
                  <div className="text-center mb-4">
                    <div className="d-inline-flex justify-content-center align-items-center rounded-circle profile-icon">
                    <RiShieldUserFill style={{ fontSize: "48px", color: "#fff" }} />
                  </div>
                </div>

                {/* Greeting */}
                  <div className="text-center mb-4">
                    <h4 className="fw-semibold text-dark profile-title">
                      Greetings, {userData?.clientName || "No Name Provided"}!
                    </h4>
                  </div>

                {/* Gender Section */}
                <GenderComponent
                  userData={userData}
                  handleChange={handleChange}
                  isEditing={isEditing}
                  errors={errors}
                />

                {/* Email Section */}
                  <div className="mb-4">
                    <h6 className="fw-bold text-secondary mb-2">Email</h6>
                    <input
                      type="email"
                      className="form-control profile-email"
                      name="clientEmail"
                      value={userData.clientEmail || ""}
                      disabled
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
                  <div className="mt-4">
                    <ButtonComponent
                      handleSaveClick={handleSaveClick}
                      handleUpdateClick={handleUpdateClick}
                      isEditing={isEditing}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
