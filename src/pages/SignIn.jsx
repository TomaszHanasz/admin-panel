import React, { useState } from "react";
import { Card } from "primereact/card";
import { Password } from "primereact/password";
import { InputText } from "primereact/inputtext";

const SignIn = () => {
  return (
    <div>
      <Card title="Title">
        <form>
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-user"></i>
            </span>
            <InputText placeholder="Login" />
          </div>
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-key"></i>
            </span>
            <Password
              value={value}
              onChange={(e) => setValue(e.target.value)}
              toggleMask
            />
          </div>
        </form>
      </Card>
    </div>
  );
};

export default SignIn;
