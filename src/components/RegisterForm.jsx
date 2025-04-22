import styles from "./Form.module.css";
import Logo from "../images/Logo.png";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useReducer } from "react";

const initialState = {
  values: {
    name: "",
    email: "",
    phone: "",
    BirthDay: null,
    password: "",
    confirmpass: "",
  },
  errors: {},
  touched: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "setField":
      return {
        ...state,
        values: {
          ...state.values,
          [action.field]: action.value,
        },
      };
    case "setTouched":
      return {
        ...state,
        touched: {
          ...state.touched,
          [action.field]: true,
        },
      };
    case "setError":
      return {
        ...state,
        errors: action.errors,
      };
    case "touchAll":
      return {
        ...state,
        touched: {
          name: true,
          email: true,
          phone: true,
          BirthDay: true,
          password: true,
          confirmpass: true,
        },
      };

    case "reset":
      return initialState;
    default:
      return state;
  }
}

function RegisterForm({ signin, setSignin, setSuccess, setMessage }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "setField", field: name, value });
  };

  const handleBlur = (e) => {
    dispatch({ type: "setTouched", field: e.target.name });
  };

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "Enter your full name.";
    } else if (values.name.length <= 5) {
      errors.name = "Name must be at least 6 characters long.";
    }

    if (!values.email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email)) {
      errors.email = "Invalid email format.";
    }

    if (!values.phone) {
      errors.phone = "Phone number is required.";
    } else if (!/^20\d{10}$/.test(values.phone)) {
      errors.phone = "Phone number must be 12 digits and start with 20.";
    }

    if (!values.BirthDay) {
      errors.BirthDay = "Enter your birthday.";
    } else {
      const age = moment().diff(moment(values.BirthDay), "years");
      if (age < 13) {
        errors.BirthDay = "You must be at least 13 years old.";
      }
    }

    if (!values.password) {
      errors.password = "Create a password.";
    } else if (values.password.length <= 5) {
      errors.password = "Password must be at least 6 characters.";
    }

    if (!values.confirmpass) {
      errors.confirmpass = "Confirm your password.";
    } else if (values.confirmpass !== values.password) {
      errors.confirmpass = "Passwords do not match.";
    }

    return errors;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "touchAll" }); // Mark everything as touched
    const errors = validate(state.values);
    dispatch({ type: "setError", errors });

    if (Object.keys(errors).length === 0) {
      setSuccess(true);
      setSignin(true);
      setMessage("Account registered!");
      dispatch({ type: "reset" });
    }
  };
  const handleSignin = (e) => {
    e.preventDefault();
    setSignin(true);
    dispatch({ type: "reset" });
  };

  const { values, errors, touched } = state;

  return (
    <div className={signin ? styles.regformDisabled : styles.regForm}>
      <img src={Logo} alt="logo" />
      <h1>Create an Account</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.email && errors.email && (
            <span className={styles.error}>{errors.email}</span>
          )}
        </div>

        <div className={styles.row}>
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your full name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.name && errors.name && (
            <span className={styles.error}>{errors.name}</span>
          )}
        </div>

        <div className={styles.row}>
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Enter your phone number"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.phone && errors.phone && (
            <span className={styles.error}>{errors.phone}</span>
          )}
        </div>

        <div className={styles.row}>
          <label htmlFor="birthday">Birthday (Age limit is 13)</label>
          <DatePicker
            id="birthday"
            selected={values.BirthDay}
            onChange={(date) =>
              dispatch({ type: "setField", field: "BirthDay", value: date })
            }
            dateFormat="dd/MM/yyyy"
            maxDate={moment().subtract(13, "years").toDate()}
            placeholderText="Enter your birthday"
          />
          {touched.BirthDay && errors.BirthDay && (
            <span className={styles.error}>{errors.BirthDay}</span>
          )}
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Create your password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.password && errors.password && (
            <span className={styles.error}>{errors.password}</span>
          )}
        </div>

        <div className={styles.row}>
          <label htmlFor="confirmpass">Confirm Password</label>
          <input
            type="password"
            id="confirmpass"
            name="confirmpass"
            placeholder="Please confirm your password"
            value={values.confirmpass}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.confirmpass && errors.confirmpass && (
            <span className={styles.error}>{errors.confirmpass}</span>
          )}
        </div>

        <div>
          <button type="submit">Create an account</button>
        </div>

        <p>
          Already have an account?{" "}
          <span className={styles.login} onClick={handleSignin}>
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default RegisterForm;
