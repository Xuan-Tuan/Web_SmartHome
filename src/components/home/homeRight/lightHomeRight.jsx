import { useState, useEffect } from "react";
import { getDatabase, ref, onValue, update } from "firebase/database";
import { MdLightMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";

export default function LightHomeRight({ setCheck, check }) {
  const [light, setLight] = useState("");

  useEffect(() => {
    const db = getDatabase();
    const dbRef = ref(db, "device01/light/light01");

    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        setLight(snapshot.val().state);
      } else {
        console.log("Không tìm thấy dữ liệu");
      }
    });

    return () => unsubscribe();
  }, []);

  const updateLightState = () => {
    const db = getDatabase();
    const dbRef = ref(db, "device01/light/light01");
    const newState = light === "Bật" ? "Tắt" : "Bật";
    update(dbRef, { state: newState })
      .then(() => {
        setLight(newState);
      })
      .catch((error) => {
        console.error("Error updating light state: ", error);
      });
  };

  const getButtonColor = (state) => {
    return state === "Bật" ? "bg-green-700" : "bg-red-600";
  };

  const getLightIcon = (state) => {
    return state === "Bật" ? (
      <MdLightMode size={40} />
    ) : (
      <MdOutlineLightMode size={40} />
    );
  };

  return (
    <div>
      <div className="bg-gray-200 shadow-2xl h-[calc(100vh-70px-50px-25px-25px)] flex flex-col justify-between">
        <div className="flex flex-col items-center px-4 py-8">
          <div className="flex flex-row justify-evenly space-x-10 mb-2">
            <div className="bg-slate-700 text-white px-4 py-2 rounded lg:w-60 lg:h-40 w-40 h-30 flex flex-col ">
              <div className="grow flex items-center justify-center">
                {getLightIcon(light)}
              </div>
              <div className="flex flex-row justify-between items-center font-semibold">
                <div>Phòng khách</div>
                <button
                  className={`${getButtonColor(light)} rounded-2xl py-1 px-6`}
                  onClick={updateLightState}
                >
                  {light}
                </button>
              </div>
            </div>
            <div className="bg-slate-700 text-white px-4 py-2 rounded lg:w-60 lg:h-40 w-40 h-30 flex flex-col ">
              <div className="grow flex items-center justify-center">
                <MdLightMode size={40} />
              </div>
              <div className="flex flex-row justify-between items-center">
                <div>Phòng ngủ </div>
                <button className="bg-green-700 rounded-2xl py-1 px-6">
                  Bật
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-evenly space-x-10 mb-2">
            <div className="bg-slate-700 text-white px-4 py-2 rounded lg:w-60 lg:h-40 w-40 h-30 flex flex-col">
              <div className="grow flex items-center justify-center">
                <MdOutlineLightMode size={40} />
              </div>
              <div className="flex flex-row justify-between items-center">
                <div>Phòng bếp</div>
                <button className="bg-red-600 rounded-2xl py-1 px-6">
                  Tắt
                </button>
              </div>
            </div>
            <div className="bg-slate-700 text-white px-4 py-2 rounded lg:w-60 lg:h-40 w-40 h-30 flex flex-col">
              <div className="grow flex items-center justify-center">
                <MdOutlineLightMode size={40} />
              </div>
              <div className="flex flex-row justify-between items-center">
                <div>Phòng ăn</div>
                <button className="bg-red-600 rounded-2xl py-1 px-6">
                  Tắt
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center space-x-2 p-4 bg-white shadow-md rounded-sm">
          <div
            className={`${
              check ? "bg-white text-uit" : "bg-uit text-white"
            } px-4 py-2 rounded cursor-pointer`}
            onClick={() => setCheck(false)}
          >
            Trạng thái
          </div>
          <div
            className={`${
              check ? "bg-uit text-white" : "bg-white text-uit"
            } px-4 py-2 rounded cursor-pointer`}
            onClick={() => setCheck(true)}
          >
            Hẹn giờ
          </div>
        </div>
      </div>
    </div>
  );
}
