import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";

export default function AccountInfor() {
  const [info, setInfo] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editInfo, setEditInfo] = useState({
    name: "",
    phone: "",
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
        const docRef = doc(db, "user", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setInfo(docSnap.data());
          setEditInfo({
            name: docSnap.data().name,
            phone: docSnap.data().phone,
            address: docSnap.data().address,
          });
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

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    const uid = localStorage.getItem("uid");
    if (!uid) {
      console.log("No user ID found in localStorage");
      return;
    }

    try {
      const docRef = doc(db, "user", uid);
      await updateDoc(docRef, {
        name: editInfo.name,
        phone: editInfo.phone,
        address: editInfo.address,
      });

      setInfo((prevInfo) => ({
        ...prevInfo,
        name: editInfo.name,
        phone: editInfo.phone,
        address: editInfo.address,
      }));

      setIsEditing(false);
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 space-y-6 bg-gray-50 min-h-screen">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl py-8 px-6 space-y-6">
        <div className="text-xl font-bold text-center text-blue-700 uppercase">
          Thông tin tài khoản của bạn
        </div>
        <div className="flex flex-col space-y-4">
          {isEditing ? (
            <>
              <div className="flex flex-col">
                <label className="font-semibold text-gray-700">Họ tên</label>
                <input
                  type="text"
                  name="name"
                  value={editInfo.name}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded-lg"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold text-gray-700">
                  Số điện thoại
                </label>
                <input
                  type="text"
                  name="phone"
                  value={editInfo.phone}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded-lg"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold text-gray-700">Địa chỉ</label>
                <input
                  type="text"
                  name="address"
                  value={editInfo.address}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded-lg"
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col">
                <span className="font-semibold text-gray-700">Họ tên:</span>
                <span className="text-gray-900">{info.name}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-gray-700">Email:</span>
                <span className="text-gray-900">{info.email}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-gray-700">
                  Số điện thoại:
                </span>
                <span className="text-gray-900">{info.phone}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-gray-700">Địa chỉ:</span>
                <span className="text-gray-900">{info.address}</span>
              </div>
            </>
          )}
        </div>
        <div className="flex justify-around mt-6">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleSave}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
              >
                Lưu
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleEdit}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
              >
                Chỉnh sửa
              </button>
              <NavLink to="/login" onClick={handleLogOut}>
                <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                  Đăng xuất
                </button>
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
