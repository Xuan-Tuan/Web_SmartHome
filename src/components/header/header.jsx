import { NavLink } from "react-router-dom";
import Logo from "../../assets/home.png";
import { AvatarAccount } from "../avatarAccount/avatarAccount";

export default function Header() {
  const navLinkClass = ({ isActive }) =>
    isActive ? "text-red-500" : "text-white";

  return (
    <header className="bg-uit h-[70px] text-white flex items-center justify-between p-2 fixed top-0 left-0 right-0 mb-2">
      <div className="flex items-center">
        <div className="ml-2 mr-8 w-16">
          <NavLink to="/user">
            <img src={Logo} alt="LOGO" />
          </NavLink>
        </div>
        <div className="flex flex-col text-white text-xs lg:text-base font-bold text-center uppercase mr-2">
          <div>Your Smart Home</div>
        </div>
      </div>
      <nav className="text-white flex flex-row items-center text-xs lg:text-base font-bold space-x-12">
        <NavLink to="/user/home" className={navLinkClass}>
          Trang chủ
        </NavLink>
        <NavLink to="/user/notification" className={navLinkClass}>
          Thông báo
        </NavLink>
        <NavLink to="/user/account" className={navLinkClass}>
          Tài khoản
        </NavLink>
      </nav>
      <div className="flex items-center justify-between mx-6">
        <div>
          <input
            type="text"
            placeholder="Tìm kiếm"
            className="rounded-full pl-4 pr-8 py-1 text-black"
            aria-label="Tìm kiếm"
          />
        </div>
        <div className="ml-6 mr-12">
          <NavLink to={`/user/account`}>
            <AvatarAccount />
          </NavLink>
        </div>
      </div>
    </header>
  );
}
