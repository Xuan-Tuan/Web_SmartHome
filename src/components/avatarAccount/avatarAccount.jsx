import React, { useState, useEffect } from "react";
import { RiAccountCircleFill } from "react-icons/ri";
import { FaAngleDown } from "react-icons/fa";
import { useUser } from "../../UserContext/userContext";

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
    </div>
  );
};
