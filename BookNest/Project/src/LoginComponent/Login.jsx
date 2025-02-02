import { loginFields } from "../ReUsableComponent/InputFields";
import { useFormik } from "formik";
import { LoginSchema } from "../Schema/Schema";
import { postLoginClient } from "../API/ClientAPI";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { PiWarningCircleDuotone } from "react-icons/pi";
import { RiLightbulbFlashFill } from "react-icons/ri";

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
      <RiLightbulbFlashFill style={{ fontSize: "5rem", color: "#fcc419" }} />
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
                className="form-control "
                style={{
                  borderRadius: "0px",
                  border: "none",
                  borderBottom: "3px solid #1971c2",
                  outlineColor: "none",
                  boxShadow: "none",
                }}
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
