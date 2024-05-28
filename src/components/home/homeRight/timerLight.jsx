import { getDatabase, ref, onValue, update } from "firebase/database";
import { useState, useEffect } from "react";

export default function LightHomeRightTimer({ setCheck, check }) {
  const [timer, setTimer] = useState({
    timerState: "",
    startTimer: "",
    endTimer: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [newStartTimer, setNewStartTimer] = useState("");
  const [newEndTimer, setNewEndTimer] = useState("");

  useEffect(() => {
    const db = getDatabase();
    const dbRef = ref(db, "device01/light/light01/timer");

    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const timerData = snapshot.val();
        setTimer({
          timerState: timerData.stateTimer,
          startTimer: timerData.start || "Chưa thiết lập",
          endTimer: timerData.end || "Chưa thiết lập",
        });
        setNewStartTimer(timerData.start || "Chưa thiết lập");
        setNewEndTimer(timerData.end || "Chưa thiết lập");
      } else {
        console.log("Không tìm thấy dữ liệu");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSave = () => {
    const db = getDatabase();
    const dbRef = ref(db, "device01/light/light01/timer");

    update(dbRef, {
      start: newStartTimer,
      end: newEndTimer,
    })
      .then(() => {
        setEditMode(false);
      })
      .catch((error) => {
        console.error("Error updating data: ", error);
      });
  };

  const handleToggleTimerState = () => {
    const db = getDatabase();
    const dbRef = ref(db, "device01/light/light01/timer");
    const newTimerState = timer.timerState === "ON" ? "OFF" : "ON";
    const updates = {
      stateTimer: newTimerState,
    };

    if (newTimerState === "OFF") {
      updates.start = "Chưa thiết lập";
      updates.end = "Chưa thiết lập";
    }

    update(dbRef, updates)
      .then(() => {
        setTimer((prevState) => ({
          ...prevState,
          timerState: newTimerState,
          startTimer:
            newTimerState === "OFF" ? "Chưa thiết lập" : prevState.startTimer,
          endTimer:
            newTimerState === "OFF" ? "Chưa thiết lập" : prevState.endTimer,
        }));
      })
      .catch((error) => {
        console.error("Error updating stateTimer: ", error);
      });
  };

  const { timerState, startTimer, endTimer } = timer;

  return (
    <div>
      <div className="bg-gray-200 shadow-2xl h-[calc(100vh-70px-50px-25px-25px)] flex flex-col justify-between">
        <div className="flex flex-col items-center px-4 py-8">
          <div className="flex flex-row justify-evenly space-x-10 mb-2">
            <div className="bg-slate-700 text-white px-4 py-2 rounded lg:w-60 lg:h-40 w-40 h-30 flex flex-col ">
              <div className="flex flex-col justify-center grow font-bold">
                <div className="flex flex-row justify-between items-center">
                  <div>Giờ bắt đầu:</div>
                  {editMode ? (
                    <input
                      type="time"
                      value={newStartTimer}
                      onChange={(e) => setNewStartTimer(e.target.value)}
                      className="text-black"
                    />
                  ) : (
                    <div>{startTimer}</div>
                  )}
                </div>

                <div className="flex flex-row justify-between items-center">
                  <div>Giờ kết thúc:</div>
                  {editMode ? (
                    <input
                      type="time"
                      value={newEndTimer}
                      onChange={(e) => setNewEndTimer(e.target.value)}
                      className="text-black"
                    />
                  ) : (
                    <div>{endTimer}</div>
                  )}
                </div>
              </div>
              <div className="flex flex-row justify-between items-center font-semibold">
                <div>Phòng khách</div>
                <button
                  className={`rounded-2xl py-1 px-6 ${
                    timerState === "ON" ? "bg-green-700" : "bg-red-600"
                  }`}
                  onClick={handleToggleTimerState}
                >
                  {timerState}
                </button>
              </div>
              <div className="flex justify-center mt-4">
                {editMode ? (
                  <button
                    className="bg-blue-500 text-white rounded-2xl py-1 px-6"
                    onClick={handleSave}
                  >
                    Lưu
                  </button>
                ) : (
                  <button
                    className={`rounded-2xl py-1 px-6 ${
                      timerState === "ON"
                        ? "bg-yellow-500 text-white"
                        : "bg-gray-400 text-white cursor-not-allowed"
                    }`}
                    onClick={() => timerState === "ON" && setEditMode(true)}
                    disabled={timerState !== "ON"}
                  >
                    Chỉnh sửa
                  </button>
                )}
              </div>
            </div>
            <div className="bg-slate-700 text-white px-4 py-2 rounded lg:w-60 lg:h-40 w-40 h-30 flex flex-col ">
              <div className="flex flex-col justify-center grow font-bold">
                <div className="flex flex-row justify-evenly">
                  <div>Giờ bắt đầu:</div>
                  <div>07:00</div>
                </div>

                <div className="flex flex-row justify-evenly">
                  <div>Giờ kết thúc:</div>
                  <div>Chưa thiết lập</div>
                </div>
              </div>
              <div className="flex flex-row justify-between items-center font-semibold">
                <div>Phòng ngủ </div>
                <button className="bg-green-700 rounded-2xl py-1 px-6">
                  ON
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-evenly space-x-10 mb-2">
            <div className="bg-slate-700 text-white px-4 py-2 rounded lg:w-60 lg:h-40 w-40 h-30 flex flex-col">
              <div className="flex flex-col justify-center grow font-bold">
                <div className="flex flex-row justify-evenly">
                  <div>Giờ bắt đầu:</div>
                  <div>Chưa thiết lập</div>
                </div>

                <div className="flex flex-row justify-evenly">
                  <div>Giờ kết thúc:</div>
                  <div>Chưa thiết lập</div>
                </div>
              </div>
              <div className="flex flex-row justify-between items-center font-semibold">
                <div>Phòng bếp</div>
                <button className="bg-red-600 rounded-2xl py-1 px-6">
                  OFF
                </button>
              </div>
            </div>
            <div className="bg-slate-700 text-white px-4 py-2 rounded lg:w-60 lg:h-40 w-40 h-30 flex flex-col">
              <div className="flex flex-col justify-center grow font-bold">
                <div className="flex flex-row justify-evenly">
                  <div>Giờ bắt đầu:</div>
                  <div>Chưa thiết lập</div>
                </div>

                <div className="flex flex-row justify-evenly">
                  <div>Giờ kết thúc:</div>
                  <div>Chưa thiết lập</div>
                </div>
              </div>
              <div className="flex flex-row justify-between items-center font-semibold">
                <div>Phòng ăn</div>
                <button className="bg-red-600 rounded-2xl py-1 px-6">
                  OFF
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center space-x-2 p-4 bg-white shadow-md rounded-sm font-bold">
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
