import { useReducer } from "react";
import styles from "./Form.module.css";
import Logo from "../images/Logo.png";

const initialState = {
  email: "",
  password: "",
  errors: {},
  touched: {
    email: false,
    password: false,
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "SET_TOUCHED":
      return {
        ...state,
        touched: {
          ...state.touched,
          [action.field]: true,
        },
      };
    case "SET_ERRORS":
      return {
        ...state,
        errors: action.errors,
      };
    case "touchAll":
      return {
        ...state,
        touched: {
          email: true,
          password: true,
        },
      };

    case "RESET":
      return initialState;
    default:
      return state;
  }
}

function LoginForm({ signin, setSignin, setMessage, setSuccess }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const validate = () => {
    const errors = {};
    if (!state.email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(state.email)) {
      errors.email = "Invalid email format.";
    }
    if (!state.password || state.password.length <= 6) {
      errors.password = "Password must be at least 6 characters long.";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "touchAll" }); // Mark everything as touched
    const errors = validate();
    dispatch({ type: "SET_ERRORS", errors });

    if (Object.keys(errors).length === 0) {
      setSuccess(true);
      setMessage("Signed in successfully");
      dispatch({ type: "RESET" }); // Optional: Reset form
    }
  };

  return (
    <div className={signin ? styles.loginForm : styles.loginFormDisabled}>
      <img src={Logo} alt="logo" />
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="loginEmail"
            placeholder="Enter your Email"
            value={state.email}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "email",
                value: e.target.value,
              })
            }
            onBlur={() => dispatch({ type: "SET_TOUCHED", field: "email" })}
          />
          {state.touched.email && state.errors.email && (
            <span className={styles.error}>{state.errors.email}</span>
          )}
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="loginPassword"
            placeholder="Enter your password"
            value={state.password}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "password",
                value: e.target.value,
              })
            }
            onBlur={() => dispatch({ type: "SET_TOUCHED", field: "password" })}
          />
          {state.touched.password && state.errors.password && (
            <span className={styles.error}>{state.errors.password}</span>
          )}
        </div>

        <div>
          <button type="submit">Login</button>
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
