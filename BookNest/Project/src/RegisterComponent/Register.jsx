import { registerFields } from "../ReUsableComponent/InputFields";
import { useFormik } from "formik";
import { RegisterSchema } from "../Schema/Schema";
import { postRegisterClient } from "../API/ClientAPI";
import { PiWarningCircleDuotone } from "react-icons/pi";
import { Link } from "react-router-dom";
import { RiLightbulbFlashFill } from "react-icons/ri";

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
          REGISTER
        </div>
        <form onSubmit={handleSubmit}>
          {registerFields.map((value, key) => (
            <div className="mb-4" key={key}>
              <input
                type={value.type}
                name={value.name}
                className="form-control"
                style={{
                  borderRadius: "0px",
                  border: "none",
                  borderBottom: "3px solid #1971c2",
                  outlineColor: "none",
                  boxShadow: "none",
                }}
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
