import {
  registerFields,
  useFormik,
  RegisterSchema,
  postRegisterClient,
  PiWarningCircleDuotone,
  Link,
  FcReading,
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
          REGISTER
        </div>
        <form onSubmit={handleSubmit}>
          {registerFields.map((value, key) => (
            <div className="mb-4" key={key}>
              <input
                type={value.type}
                name={value.name}
                className="form-control inputBox"
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
            Register
          </button>
          <div className="mt-3 text-center">
            <Link to="/" className="text-decoration-none">
              Already Registered? Login Here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
