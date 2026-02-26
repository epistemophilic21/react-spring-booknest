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
        background:
          "linear-gradient(to top, #b224ef 0%, #7579ff 100%)",
        padding: "2rem",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div
        className="container p-5"
        style={{
          maxWidth: "510px",
          width: "100%",
          background: "#ffffff",
          borderRadius: "24px",
          boxShadow: "0 25px 50px rgba(0, 0, 0, 0.2)",
          transition: "all 0.3s ease",
        }}
      >
        {/* Heading */}
        <div className="text-center mb-4">
          <h2
            style={{
              fontWeight: "700",
              marginBottom: "0.25rem",
              color: "#111827",
            }}
          >
            Welcome Back
          </h2>
          <p style={{ color: "#6b7280", fontSize: "0.95rem" }}>
            Sign in to continue
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {loginFields.map((value, key) => (
            <div className="mb-4" key={key}>
              <input
                type={value.type}
                name={value.name}
                value={values[value.name]}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={value.placeholder}
                autoComplete={value.autoComplete}
                className="form-control"
                style={{
                  borderRadius: "14px",
                  padding: "0.85rem 1rem",
                  fontSize: "0.95rem",
                  background: "#f3f4f6",
                  border: "1px solid #e5e7eb",
                  transition: "all 0.25s ease",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#3b82f6";
                  e.target.style.boxShadow =
                    "0 0 0 4px rgba(59,130,246,0.15)";
                  e.target.style.background = "#ffffff";
                }}
              />

              {errors[value.name] && touched[value.name] && (
                <div
                  className="mt-2 d-flex align-items-center"
                  style={{
                    fontSize: "0.85rem",
                    color: "#dc2626",
                    background: "rgba(220,38,38,0.08)",
                    padding: "0.5rem 0.75rem",
                    borderRadius: "10px",
                  }}
                >
                  <PiWarningCircleDuotone
                    style={{ fontSize: "18px", marginRight: "0.5rem" }}
                  />
                  {errors[value.name]}
                </div>
              )}
            </div>
          ))}

          <button
            type="submit"
            className="btn w-100"
            style={{
              background:
                "#0072ff",
              border: "none",
              padding: "0.85rem",
              borderRadius: "14px",
              color: "#fff",
              fontSize: "1rem",
              fontWeight: "600",
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
              transition: "all 0.25s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow =
                "0 15px 35px rgba(0, 0, 0, 0.3)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow =
                "0 10px 25px rgba(0, 0, 0, 0.2)";
            }}
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <a
            href="/register"
            className="text-decoration-none"
            style={{ fontSize: "0.9rem", color: "#6b7280" }}
          >
            Don’t have an account?{" "}
            <span style={{ color: "#0072ff", fontWeight: "600" }}>
              Create account
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
