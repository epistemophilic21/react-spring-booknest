import {
  loginFields,
  useFormik,
  LoginSchema,
  postLoginClient,
  useContext,
  AuthContext,
  useNavigate,
  PiWarningCircleDuotone,
} from "../imports";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const initialValues = {
    authUser: "",
    authPassword: "",
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: LoginSchema,
      onSubmit: async (values) => {
        const data = await postLoginClient(values);
        if (data?.jwtToken && data?.statusCode === 200) {
          login(data.jwtToken);
          navigate("/home");
        } else {
          navigate("/");
        }
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
          LOGIN
        </div>

        <form onSubmit={handleSubmit}>
          {loginFields.map((value, key) => (
            <div className="mb-3" key={key}>
              <input
                type={value.type}
                className="form-control"
                style={{
                  borderRadius: "12px",
                  border: "1px solid #ced4da",
                  padding: "0.75rem 1rem",
                  fontSize: "1rem",
                  background: "#f8f9fa",
                  transition: "all 0.3s ease",
                  boxShadow: "inset 0 1px 2px rgba(0,0,0,0.05)",
                }}
                name={value.name}
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
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <a
            href="/register"
            className="text-decoration-none"
            style={{ fontSize: "0.95rem", color: "#6c757d" }}
          >
            Don’t have an account?{" "}
            <span style={{ color: "#007bff", fontWeight: "500" }}>Register here</span>
          </a>
        </div>
      </div>
    </div>

  );
}

export default Login;
