import * as Yup from "yup";

export const RegisterSchema = Yup.object({
  clientName: Yup.string().min(3).required("Enter your name"),
  clientEmail: Yup.string().min(5).required("Enter your email"),
  clientPassword: Yup.string().min(5).required("Enter your password"),
});

export const LoginSchema = Yup.object({
  authUser: Yup.string().min(5).required("Enter your email"),
  authPassword: Yup.string().min(5).required("Enter your password"),
});
