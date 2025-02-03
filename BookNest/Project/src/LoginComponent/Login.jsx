import {
  loginFields,
  useFormik,
  LoginSchema,
  postLoginClient,
  useContext,
  AuthContext,
  useNavigate,
  PiWarningCircleDuotone,
  FcReading,
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
      className="d-flex justify-content-center gap-4  align-items-center flex-column"
      style={{ minHeight: "100vh" }}
    >
      <FcReading style={{ fontSize: "7rem" }} />
      <div
        className="container p-4"
        style={{
          maxWidth: "400px",
        }}
      >
        <div
          className="d-flex justify-content-center mb-5"
          style={{
            fontWeight: "bold",
            fontSize: "27px",
            letterSpacing: "3px",
            color: "#868e96",
          }}
        >
          LOGIN
        </div>
        <form onSubmit={handleSubmit}>
          {loginFields.map((value, key) => (
            <div className="mb-4" key={key}>
              <input
                type={value.type}
                className="form-control inputBox"
                name={value.name}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values[value.name]}
                placeholder={value.placeholder}
                autoComplete={value.autoComplete}
              />
              {errors[value.name] && touched[value.name] ? (
                <div className="alert alert-danger mt-2" role="alert">
                  {errors[value.name]}{" "}
                  <span>
                    <PiWarningCircleDuotone style={{ fontSize: "22px" }} />
                  </span>
                </div>
              ) : null}
            </div>
          ))}

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        <div className="mt-3 text-center">
          <a href="/register" className="text-decoration-none">
            Do not have an account? Register here
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
