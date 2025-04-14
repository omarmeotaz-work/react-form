import styles from "./Form.module.css";
import Logo from "../images/Logo.png";
import { useFormik } from "formik";

function LoginForm({ signin, setSignin, setMessage, setSuccess }) {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: () => {
      setSuccess(true);
    },

    validate: (values) => {
      const errors = {};
      if (
        !values.email ||
        !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(values.email)
      )
        errors.email = "Invalid email format.";
      if (values.password.length <= 6)
        errors.password = "password must be at least 6 char long";
      return errors;
    },
  });

  return (
    <div className={signin ? styles.loginForm : styles.loginFormDisabled}>
      <img src={Logo} alt="logo" />
      <h1>Login</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="logEmail"
            placeholder="Enter your Email"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <span className={styles.error}>{formik.errors.email}</span>
          ) : null}
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Create your password"
            id="logPassword"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password ? (
            <span className={styles.error}>{formik.errors.password}</span>
          ) : null}
        </div>
        <div>
          <button
            type="submit"
            onClick={() => setMessage("signed in succesfully")}
          >
            Login
          </button>
        </div>
        <p>
          Don't have an account?{" "}
          <span className={styles.signup} onClick={() => setSignin(false)}>
            Signup
          </span>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
