import { useState, useEffect } from "react";
import { getDatabase, ref, onValue, update } from "firebase/database";
import { TbCarFan1, TbCarFan2, TbCarFan3 } from "react-icons/tb";

export default function FanHomeRight() {
  const [fan, setFan] = useState("");

  useEffect(() => {
    const db = getDatabase();
    const dbRef = ref(db, "device01/fan/fan01");

    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        setFan(snapshot.val().state);
      } else {
        console.log("Không tìm thấy dữ liệu");
      }
    });
    return () => unsubscribe();
  }, []);

  const updateFanState = (newState) => {
    const db = getDatabase();
    const dbRef = ref(db, "device01/fan/fan01");
    update(dbRef, { state: newState });
  };

  const getIconStyle = (state, level) => {
    return {
      size: state === level ? 50 : 30,
      color: state === level ? "#ef4444" : "#a3a3a3",
    };
  };

  const getOffButtonColor = (state) => {
    return state === "Tắt" ? "bg-red-600" : "bg-green-600";
  };

  return (
    <div>
      <div className="bg-gray-200 shadow-2xl h-[calc(100vh-70px-50px-25px-25px)] flex flex-col justify-between">
        <div className="flex flex-col items-center px-4 py-8">
          <div className="flex flex-row justify-evenly space-x-10 mb-2">
            <div className="bg-white shadow-md text-black px-4 py-2 rounded lg:w-60 lg:h-40 w-40 h-30 flex flex-col lg:text-base text-xs">
              <div className="flex flex-row grow justify-evenly items-center">
                <button
                  className="bg-white p-2 rounded-xl flex-1 mr-2 flex items-center"
                  onClick={() => updateFanState("Nhẹ")}
                >
                  <TbCarFan1
                    size={getIconStyle(fan, "Nhẹ").size}
                    color={getIconStyle(fan, "Nhẹ").color}
                  />
                </button>
                <button
                  className="bg-white p-2 rounded-xl flex-1 mr-2 flex items-center"
                  onClick={() => updateFanState("Vừa")}
                >
                  <TbCarFan2
                    size={getIconStyle(fan, "Vừa").size}
                    color={getIconStyle(fan, "Vừa").color}
                  />
                </button>
                <button
                  className="bg-white p-2 rounded-xl flex-1 mr-2 flex items-center"
                  onClick={() => updateFanState("Mạnh")}
                >
                  <TbCarFan3
                    size={getIconStyle(fan, "Mạnh").size}
                    color={getIconStyle(fan, "Mạnh").color}
                  />
                </button>
              </div>
              <div className="flex flex-row justify-between items-center">
                <div className="text-uit font-semibold">Quạt 01</div>
                <button
                  className={`${getOffButtonColor(
                    fan
                  )} text-white rounded-2xl py-1 px-6`}
                  onClick={() => updateFanState("Tắt")}
                >
                  Tắt
                </button>
              </div>
            </div>
            <div className="bg-white shadow-md text-black px-4 py-2 rounded lg:w-60 lg:h-40 w-40 h-30 flex flex-col lg:text-base text-xs">
              <div className="flex flex-row grow justify-evenly items-center">
                <button className="bg-white p-2 rounded-xl flex-1 mr-2 flex items-center">
                  <TbCarFan1 size={30} color="#a3a3a3" />
                </button>
                <button className="bg-white p-2 rounded-xl flex-1 mr-2 flex items-center">
                  <TbCarFan2 size={30} color="#a3a3a3" />
                </button>
                <button className="bg-white p-2 rounded-xl flex-1 mr-2 flex items-center">
                  <TbCarFan3 size={30} color="#a3a3a3" />
                </button>
              </div>
              <div className="flex flex-row justify-between items-center">
                <div className="text-uit font-semibold">Quạt 02</div>
                <button className="bg-red-600 rounded-2xl py-1 px-6">
                  Tắt
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-evenly space-x-10 mb-2">
            <div className="bg-white shadow-md text-black px-4 py-2 rounded lg:w-60 lg:h-40 w-40 h-30 flex flex-col lg:text-base text-xs">
              <div className="flex flex-row grow justify-evenly items-center">
                <button className="bg-white p-2 rounded-xl flex-1 mr-2 flex items-center">
                  <TbCarFan1 size={30} color="#a3a3a3" />
                </button>
                <button className="bg-white p-2 rounded-xl flex-1 mr-2 flex items-center">
                  <TbCarFan2 size={30} color="#a3a3a3" />
                </button>
                <button className="bg-white p-2 rounded-xl flex-1 mr-2 flex items-center">
                  <TbCarFan3 size={30} color="#a3a3a3" />
                </button>
              </div>
              <div className="flex flex-row justify-between items-center">
                <div className="text-uit font-semibold">Quạt 03</div>
                <button className="bg-red-600 rounded-2xl py-1 px-6">
                  Tắt
                </button>
              </div>
            </div>
            <div className="bg-white shadow-md text-black px-4 py-2 rounded lg:w-60 lg:h-40 w-40 h-30 flex flex-col lg:text-base text-xs">
              <div className="flex flex-row grow justify-evenly items-center">
                <button className="bg-white p-2 rounded-xl flex-1 mr-2 flex items-center">
                  <TbCarFan1 size={30} color="#a3a3a3" />
                </button>
                <button className="bg-white p-2 rounded-xl flex-1 mr-2 flex items-center">
                  <TbCarFan2 size={30} color="#a3a3a3" />
                </button>
                <button className="bg-white p-2 rounded-xl flex-1 mr-2 flex items-center">
                  <TbCarFan3 size={30} color="#a3a3a3" />
                </button>
              </div>
              <div className="flex flex-row justify-between items-center">
                <div className="text-uit font-semibold">Quạt 04</div>
                <button className="bg-red-600 rounded-2xl py-1 px-6">
                  Tắt
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center p-4 bg-white shadow-md items-center">
          <div className="bg-uit text-white px-4 py-2 text-center rounded-xl w-40">
            Trạng thái
          </div>
        </div>
      </div>
    </div>
  );
}
