import React, { useState, useEffect } from "react";
import { RiAccountCircleFill } from "react-icons/ri";
import { FaAngleDown } from "react-icons/fa";
import { useUser } from "../../UserContext/userContext";
import { NavLink } from "react-router-dom";

const handleLogOut = () => {
  localStorage.clear();
};

export const AvatarAccount = () => {
  const [isLogoutVisible, setIsLogoutVisible] = useState(false);
  const { name } = useUser();
  return (
    <div className="flex items-center space-x-4 relative">
      <p className="text-lg font-semibold">{name}</p>
      <div className="h-[70px] relative flex items-center justify-between space-x-4">
        <RiAccountCircleFill size={56} />
        <FaAngleDown
          size={24}
          className="text-gray-500 cursor-pointer"
          onClick={() => setIsLogoutVisible(!isLogoutVisible)}
        />
      </div>
      {isLogoutVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
          <div className="bg-white p-6 rounded-lg flex flex-col items-center justify-between ">
            <div className="text-xl mb-4 font-bold text-uit">
              Xác nhận đăng xuất tài khoản của bạn ?
            </div>
            <div className="flex flex-row items-center justify-between">
              <NavLink to={"/login"} onClick={handleLogOut}>
                <button className="bg-red-500 px-4 py-2 rounded-xl mr-2 w-28">
                  Đăng xuất
                </button>
              </NavLink>
              <button
                className="bg-green-500 px-4 py-2 rounded-xl mr-2 w-28"
                onClick={() => setIsLogoutVisible(!isLogoutVisible)}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
