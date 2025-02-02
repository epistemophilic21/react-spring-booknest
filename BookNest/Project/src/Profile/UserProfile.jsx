import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import authApi from "../API/APIClient";
import { RiShieldUserFill } from "react-icons/ri";
import NavigationBar from "../NavBarComponent/NavigationBar";

function UserProfile() {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false); // Track edit mode

  useEffect(() => {
    if (!user || !user.sub) {
      console.log("User not found, skipping fetch");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await authApi.get(`/getClient/${user.sub}`);
        console.log(response);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.sub]);

  if (loading) {
    return <div className="container mt-5">Loading...</div>;
  }

  if (!user) {
    return <div className="container mt-5">User not found. Please log in.</div>;
  }

  const capitalizeFirstLetter = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleUpdateClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      await authApi.put(`/update/${user.sub}`, userData);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <NavigationBar />
      <div className="container mt-3">
        <div className="card">
          <div className="card-body">
            <p className="card-title text-center">
              <RiShieldUserFill
                style={{ fontSize: "52px", color: "#1864ab" }}
              />
            </p>

            <div className="text-center my-4">
              <h3>
                Greetings,{" "}
                {capitalizeFirstLetter(
                  userData?.clientName || "No Name Provided"
                )}
                !
              </h3>
            </div>

            {/* Gender Section */}
            <div className="mb-3">
              <h6>Gender:</h6>
              <select
                className="form-select"
                name="gender"
                value={userData?.gender || "Select Gender"}
                onChange={handleChange}
                disabled={!isEditing}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
            </div>

            {/* Email Section */}
            <div className="mb-3">
              <h6>Email:</h6>
              <input
                type="email"
                className="form-control"
                name="clientEmail"
                placeholder="Enter your email"
                value={userData?.clientEmail || ""}
                disabled
              />
            </div>

            {/* Address Section */}
            <div className="mb-3">
              <h6>Address:</h6>
              <textarea
                className="form-control"
                name="address"
                placeholder="Enter your address"
                rows="3"
                value={userData?.address || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            {/* Phone Number Section */}
            <div className="mb-3">
              <h6>Phone Number:</h6>
              <input
                type="tel"
                className="form-control"
                name="mobileNumber"
                placeholder="Enter your phone number"
                value={userData?.mobileNumber || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            {/* Buttons */}
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
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
