import React from "react";
import User from "./user";
import LightHomePage from "./homePage/lightHomePage";
export default function UserHomeLight() {
  return (
    <div>
      <User>
        <LightHomePage />
      </User>
    </div>
  );
}
