import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();
const initialState = {
  user: null,
  isAuthenticated: false,
  users: [
    {
      Fullname: "John Smith",
      email: "john@example.com",
      phone: 123456789011,
      password: "12345",
      avatar: "https://i.pravatar.cc/100?u=zz",
    },
  ],
};
function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "register":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("unkown action type");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );
  function login(userName, password) {
    if (
      (userName === initialState.users.userName) &
      (password === initialState.users.password)
    ) {
      dispatch({ type: "login", payload: userName });
    }
  }
  function register(userName, email, password) {
    if (userName && email && password) {
      dispatch({ type: "register", payload: userName });
    }
  }
  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("auth context used outside of auth provider");
  return context;
}

export { AuthProvider, useAuth };
