import { useState, useEffect } from "react";
import { getDatabase, ref, onValue, update } from "firebase/database";
import { FaDoorOpen, FaDoorClosed } from "react-icons/fa6";

export default function DoorHomeRight() {
  const [door, setDoor] = useState("");

  useEffect(() => {
    const db = getDatabase();
    const dbRef = ref(db, "device01/door/door01");

    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        setDoor(snapshot.val().state);
      } else {
        console.log("Không tìm thấy dữ liệu");
      }
    });
    return () => unsubscribe();
  }, []);

  const getButtonColor = (state) => {
    return state === "Mở" ? "bg-green-700" : "bg-red-500";
  };

  const toggleDoorState = () => {
    const db = getDatabase();
    const dbRef = ref(db, "device01/door/door01");
    const newState = door === "Mở" ? "Đóng" : "Mở";
    update(dbRef, { state: newState })
      .then(() => {
        setDoor(newState);
      })
      .catch((error) => {
        console.error("Error updating state:", error);
      });
  };

  return (
    <div>
      <div className="bg-gray-200 shadow-2xl h-[calc(100vh-70px-50px-25px-25px)] flex flex-col justify-between">
        <div className="flex flex-col items-center px-4 py-8">
          <div className="flex lg:flex-row flex-col justify-between items-center lg:space-x-6 mb-2">
            <div className="bg-stone-500 text-white px-4 py-2 rounded lg:w-60 lg:h-40 w-60 h-35 flex flex-col lg:text-base text-xs">
              <div className="grow flex items-center">
                {door === "Mở" ? (
                  <FaDoorOpen size={40} />
                ) : (
                  <FaDoorClosed size={40} />
                )}
              </div>
              <div className="flex flex-row justify-between items-center font-semibold">
                <div>Cửa 01</div>
                <button
                  className={`${getButtonColor(door)} rounded-2xl py-1 px-6`}
                  onClick={toggleDoorState}
                >
                  {door}
                </button>
              </div>
            </div>
            <div className="bg-stone-500 text-white px-4 py-2 rounded lg:w-60 lg:h-40 w-60 h-35 flex flex-col lg:text-base text-xs">
              <div className="grow flex items-center">
                <FaDoorClosed size={40} />
              </div>
              <div className="flex flex-row justify-between items-center">
                <div>Cửa 02</div>
                <button className="bg-red-500 rounded-2xl py-1 px-6">
                  Đóng
                </button>
              </div>
            </div>
          </div>
          <div className="flex lg:flex-row flex-col justify-between items-center lg:space-x-6 mb-2">
            <div className="bg-stone-500 text-white px-4 py-2 rounded lg:w-60 lg:h-40 w-60 h-35 flex flex-col lg:text-base text-xs">
              <div className="grow flex items-center">
                <FaDoorOpen size={40} />
              </div>
              <div className="flex flex-row justify-between items-center">
                <div>Cửa 03</div>
                <button className="bg-green-700 rounded-2xl py-1 px-6">
                  Mở
                </button>
              </div>
            </div>
            <div className="bg-stone-500 text-white px-4 py-2 rounded lg:w-60 lg:h-40 w-60 h-35 flex flex-col lg:text-base text-xs">
              <div className="grow flex items-center">
                <FaDoorOpen size={40} />
              </div>
              <div className="flex flex-row justify-between items-center">
                <div>Cửa 04</div>
                <button className="bg-green-700 rounded-2xl py-1 px-6">
                  Mở
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
