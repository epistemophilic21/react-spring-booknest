import {
  registerFields,
  useFormik,
  RegisterSchema,
  postRegisterClient,
  PiWarningCircleDuotone,
  Link,
} from "../imports";

function Register() {
  const initialValues = {
    clientName: "",
    clientEmail: "",
    clientPassword: "",
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: RegisterSchema,
      onSubmit: async (values) => {
        await postRegisterClient(values);
      },
    });

  return (
    <div
      className="d-flex justify-content-center align-items-center flex-column"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f0f2f5, #dfe6ed)",
        padding: "2rem",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div
        className="container p-4"
        style={{
          maxWidth: "400px",
          width: "100%",
          background: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          borderRadius: "20px",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        <div
          className="text-center mb-4 card-heading">
          REGISTER
        </div>

        <form onSubmit={handleSubmit}>
          {registerFields.map((value, key) => (
            <div className="mb-3" key={key}>
              <input
                type={value.type}
                name={value.name}
                className="form-control inputBox"
                style={{
                  borderRadius: "12px",
                  border: "1px solid #ced4da",
                  padding: "0.75rem 1rem",
                  fontSize: "1rem",
                  background: "#f8f9fa",
                  transition: "all 0.3s ease",
                  boxShadow: "inset 0 1px 2px rgba(0,0,0,0.05)",
                }}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values[value.name]}
                placeholder={value.placeholder}
                autoComplete={value.autoComplete}
              />
              {errors[value.name] && touched[value.name] && (
                <div
                  className="alert alert-danger mt-2 d-flex align-items-center p-2"
                  style={{
                    fontSize: "0.875rem",
                    borderRadius: "8px",
                  }}
                  role="alert"
                >
                  <PiWarningCircleDuotone style={{ fontSize: "20px", marginRight: "0.5rem" }} />
                  {errors[value.name]}
                </div>
              )}
            </div>
          ))}

          <button
            type="submit"
            className="btn w-100"
            style={{
              background: "#007bff",
              border: "none",
              padding: "0.75rem",
              borderRadius: "12px",
              color: "#fff",
              fontSize: "1rem",
              fontWeight: "500",
              transition: "background 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.background = "#0069d9")}
            onMouseOut={(e) => (e.target.style.background = "#007bff")}
          >
            Register
          </button>

          <div className="mt-4 text-center">
            <Link
              to="/"
              className="text-decoration-none"
              style={{ fontSize: "0.95rem", color: "#6c757d" }}
            >
              Already Registered?{" "}
              <span style={{ color: "#007bff", fontWeight: "500" }}>
                Login Here
              </span>
            </Link>
          </div>
        </form>
      </div>
    </div>

  );
}

export default Register;
