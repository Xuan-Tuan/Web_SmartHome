import React from "react";
import User from "./user";
import TemAndHumHomePage from "./homePage/temAndHumHomePage";
export default function UserHomeTemAndHum() {
  return (
    <div>
      <User>
        <TemAndHumHomePage />
      </User>
    </div>
  );
}
