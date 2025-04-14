import styles from "./Form.module.css";
import { useFormik } from "formik";
import Logo from "../images/Logo.png";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function RegisterForm({ signin, setSignin, setSuccess, setMessage }) {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      BirthDay: null,
      password: "",
      confirmpass: "",
    },
    onSubmit: () => {
      setSuccess(true);
      setSignin(true);
    },

    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = "Enter your full name.";
      } else if (values.name.length <= 5) {
        errors.name = "Name must be atleast 6 characters long.";
      }
      if (
        !values.email ||
        !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email format.";
      }
      if (!values.phone || !values.phone.startsWith(20))
        errors.phone = "invalid phone number";
      if (values.phone.length !== 12)
        errors.phone = "phone number must be 12 digits long";
      if (!values.BirthDay) errors.BirthDay = "enter your birthday";
      if (!values.password) errors.password = "create a password";
      if (values.password.length <= 5)
        errors.password = "password must be at least 6 char long";
      if (!values.confirmpass) errors.confirmpass = "confirm your password";
      if (values.confirmpass !== values.password)
        errors.confirmpass = "value not the same as password";
      if (values.BirthDay) {
        const age = moment().diff(moment(values.BirthDay), "years");
        if (age < 13) {
          errors.BirthDay = "You must be at least 13 years old.";
        }
      }
      return errors;
    },
  });

  return (
    <div className={signin ? styles.regformDisabled : styles.regForm}>
      <img src={Logo} alt="logo" />
      <h1>create an Account</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your Email"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <span className={styles.error}>{formik.errors.email}</span>
          ) : null}
        </div>

        <div className={styles.row}>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="fullName"
            id="fullName"
            placeholder="Enter your full name"
            {...formik.getFieldProps("name")}
          />
          {formik.touched.name && formik.errors.name ? (
            <span className={styles.error}>{formik.errors.name}</span>
          ) : null}
        </div>
        <div className={styles.row}>
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            placeholder="Enter your phone number"
            {...formik.getFieldProps("phone")}
          />
          {formik.touched.phone && formik.errors.phone ? (
            <span className={styles.error}>{formik.errors.phone}</span>
          ) : null}
        </div>
        <div className={styles.row}>
          <label htmlFor="birthday">Birthday (Age limit is 13)</label>
          <DatePicker
            id="date"
            selected={formik.values.BirthDay}
            onChange={(date) => formik.setFieldValue("BirthDay", date)}
            dateFormat="dd/MM/yyyy"
            maxDate={moment().subtract(13, "years").toDate()}
            placeholderText="Enter your birthday"
          />
          {formik.touched.BirthDay && formik.errors.BirthDay ? (
            <span className={styles.error}>{formik.errors.BirthDay}</span>
          ) : null}
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Create your password"
            id="password"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password ? (
            <span className={styles.error}>{formik.errors.password}</span>
          ) : null}
        </div>
        <div className={styles.row}>
          <label htmlFor="confirmpassword">Confirm Password</label>
          <input
            type="password"
            placeholder="Please confirm your password"
            id="confirmpassword"
            {...formik.getFieldProps("confirmpass")}
          />
          {formik.touched.confirmpass && formik.errors.confirmpass ? (
            <span className={styles.error}>{formik.errors.confirmpass}</span>
          ) : null}
        </div>
        <div>
          <button
            type="submit"
            onClick={() => {
              setMessage("account registered!");
            }}
          >
            Create an account
          </button>
        </div>
        <p>
          already have an account?{" "}
          <span
            className={styles.login}
            onClick={() => {
              setSignin(true);
            }}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default RegisterForm;
