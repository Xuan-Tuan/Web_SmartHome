import LoginPage from "../view/authentication/logIn";
import ErrorPage from "..//view/authentication/errorPage";
// admin

import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
// user
import UserAccount from "../view/user/userAccount";
import UserNotification from "../view/user/userNotification";
import UserHomeLight from "../view/user/userHomeLight";
import UserHomeDoor from "../view/user/userHomeDoor";
import UserHomeFan from "../view/user/userHomeFan";
import UserHomeTemAndHum from "../view/user/userHomeTemAndHum";

export const browserRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/error" element={<ErrorPage />} />
      <Route path="/user" element={<UserHomeLight />} />
      <Route path="/user/home" element={<UserHomeLight />} />
      <Route path="/user/home/light" element={<UserHomeLight />} />
      <Route path="/user/home/fan" element={<UserHomeFan />} />
      <Route path="/user/home/door" element={<UserHomeDoor />} />
      <Route path="/user/home/temandhum" element={<UserHomeTemAndHum />} />
      <Route path="/user/notification" element={<UserNotification />} />
      <Route path="/user/account" element={<UserAccount />} />
    </Route>
  )
);
