import React, { useState } from "react";
import { Card } from "primereact/card";
import { Password } from "primereact/password";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import "./signIn.style.css";

const SignIn = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signIn } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(login, password);
      navigate("/admin");
    } catch (e) {
      setError(e.message);
      console.log(error);
    }
  };

  return (
    <div className="sign-in__bg">
      <Card title="Sign In" className="sign-in__card">
        <form className="sign-in__form" onSubmit={handleSubmit}>
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-user"></i>
            </span>
            <InputText
              placeholder="Login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </div>
          <br />
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-key"></i>
            </span>
            <Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              toggleMask
              feedback={false}
            />
          </div>
          {error && <p>{error}</p>}
          <br />
          <Button label="Sign in" icon="pi pi-sign-in" type="submit" />
        </form>
      </Card>
    </div>
  );
};

export default SignIn;
