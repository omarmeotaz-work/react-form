import "./App.css";
import BackgroundImg from "./components/BackgroundImg";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import SuccessMessage from "./components/successMessage";
import Image from "./images/Image.png";
import { useState } from "react";

const App = () => {
  const [signin, setSignin] = useState(false);
  const [registerSuccess, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <div className="container">
      <LoginForm
        signin={signin}
        setSignin={setSignin}
        setMessage={setMessage}
        setSuccess={setSuccess}
      />
      <BackgroundImg />
      {registerSuccess && (
        <SuccessMessage
          registerSuccess={registerSuccess}
          setSuccess={setSuccess}
          message={message}
        />
      )}
      <RegisterForm
        signin={signin}
        setSignin={setSignin}
        registerSuccess={registerSuccess}
        setSuccess={setSuccess}
        setMessage={setMessage}
      />
    </div>
  );
};

export default App;
