import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";

export default function AccountInfor() {
  const [info, setInfo] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const uid = localStorage.getItem("uid");
      if (!uid) {
        console.log("No user ID found in localStorage");
        return;
      }

      try {
        const docRef = doc(db, "user", `${uid}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setInfo(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchData();
  }, []);

  const handleLogOut = () => {
    localStorage.clear();
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 space-y-6">
      <div className="text-lg font-bold text-left align-middle pl-10 text-blue-700">
        Tài khoản của bạn
      </div>
      <div className="flex flex-col space-y-4 span-4 bg-gray-100 rounded-xl py-8 px-6">
        <div className="text-lg font-bold bg-white rounded-lg px-6 py-2 text-uit text-center uppercase">
          Thông tin tài khoản của bạn
        </div>
        <div className="flex flex-col items-start ml-6 space-y-4">
          <div>
            <span className="font-semibold">Họ tên: </span>
            {info.name}
          </div>
          <div>
            <span className="font-semibold">Email: </span>
            {info.email}
          </div>
          <div>
            <span className="font-semibold">Số điện thoại: </span>
            {info.phone}
          </div>
          <div>
            <span className="font-semibold">Địa chỉ: </span>
            {info.address}
          </div>
        </div>
        <div className="flex items-center justify-evenly">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-2xl mr-2">
            Chỉnh sửa
          </button>
          <NavLink to={"/login"} onClick={handleLogOut}>
            <button className="bg-red-500 text-white px-4 py-2 rounded-2xl">
              Đăng xuất
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
