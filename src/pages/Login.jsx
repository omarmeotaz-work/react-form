import styles from "./Login.module.css";
import { useReducer } from "react";
import { useNavigate } from "react-router-dom";

const initialValue = {
  email: "",
  password: "",
};

const LoginReducer = (state, action) => {
  switch (action.type) {
    case "email":
      return { ...state, email: action.payload };
    case "password":
      return { ...state, password: action.payload };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

function Login() {
  const [state, dispatch] = useReducer(LoginReducer, initialValue);
  return (
    <div>
      <input
        value={state.email}
        onChange={(event) =>
          dispatch({ type: "email", payload: event.target.value })
        }
      />
      <input
        value={state.password}
        onChange={(event) =>
          dispatch({ type: "password", payload: event.target.value })
        }
      />
    </div>
  );
}

export default Login;
