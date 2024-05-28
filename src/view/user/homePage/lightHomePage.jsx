import { useState } from "react";
import LightHomeRight from "../../../components/home/homeRight/lightHomeRight";
import HomePage from "./homePage";
import LightHomeRightTimer from "../../../components/home/homeRight/timerLight";

export default function LightHomePage() {
  const [check, setCheck] = useState(false);
  return (
    <div>
      <HomePage>
        {!check ? (
          <LightHomeRight setCheck={setCheck} check={check} />
        ) : (
          <LightHomeRightTimer setCheck={setCheck} check={check} />
        )}
      </HomePage>
    </div>
  );
}
