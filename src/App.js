import React from "react";
import "./App.css";
import BasicTextFields from "./components/atoms/BasicTextFields";
import { Route, Routes, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebase/config";
import Home from "./components/pages/Home";
import Sub from "./components/pages/Sub";

function App() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [authToken, setAuthToken] = React.useState("");
  let navigate = useNavigate();

  const handleAction = (id) => {
    if (id === 1) {
      signInWithEmailAndPassword(auth, email, password).then((res) => {
        navigate("/home", { replace: true });
        window.location.reload();
        sessionStorage.setItem("Auth Token", res._tokenResponse.refreshToken);
      });
    }
    if (id === 2) {
      createUserWithEmailAndPassword(auth, email, password).then((res) => {
        navigate("/home", { replace: true });
        window.location.reload();
        sessionStorage.setItem("Auth Token", res._tokenResponse.refreshToken);
      });
    }
    setEmail("");
    setPassword("");
  };
  React.useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");

    if (authToken) {
      setAuthToken(authToken);
    }
  }, [setAuthToken]);
  return (
    <div className="App">
      {/* <BasicTextFields /> */}
      <>
        <Routes>
          {authToken ? (
            <>
              <Route path="/home" element={<Home />} />
              <Route path="/sub" element={<Sub />} />
            </>
          ) : (
            <>
              <Route
                path="/register"
                element={
                  <BasicTextFields
                    title="register"
                    setEmail={setEmail}
                    setPassword={setPassword}
                    email={email}
                    password={password}
                    handleAction={() => handleAction(2)}
                  />
                }
              />
              <Route
                path="/login"
                element={
                  <BasicTextFields
                    title="Login"
                    setEmail={setEmail}
                    setPassword={setPassword}
                    email={email}
                    password={password}
                    handleAction={() => handleAction(1)}
                  />
                }
              />
            </>
          )}
        </Routes>
      </>
    </div>
  );
}

export default App;
