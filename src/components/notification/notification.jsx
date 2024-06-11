import React, { useState, useEffect } from "react";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";

export default function Notification() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const uid = localStorage.getItem("uid");
      if (!uid) {
        console.log("No user ID found in localStorage");
        return;
      }

      try {
        const q = query(collection(db, "info"), where("userID", "==", uid));
        const querySnapshot = await getDocs(q);
        const notificationsData = querySnapshot.docs.map((doc) => doc.data());
        setNotifications(notificationsData);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col mt-[90px] mb-[70px] ">
      <div className=" text-base font-bold text-left align-middle pl-10 text-uit mt-2 mb-2">
        Thông báo
      </div>
      <div className="flex flex-col ml-20 mr-60 bg-gray-100 shadow-md gap-5 p-5 overflow-y-scroll will-change-scroll max-h-[600px]">
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <div
              key={index}
              className="flex flex-row justify-between text-center px-8 py-4 my-5 border-uit border-2 rounded-lg bg-white shadow-lg"
            >
              <div className="flex flex-col text-start text-uit text-lg font-bold">
                <p>Tiêu đề: {notification.title}</p>
                <p>Nội dung: {notification.content}</p>
              </div>
              <div>
                <IoArrowForwardCircleOutline
                  size={50}
                  className="text-uit flex items-center"
                />
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-lg font-semibold text-gray-600">
            Không có thông báo nào.
          </div>
        )}
      </div>
    </div>
  );
}
