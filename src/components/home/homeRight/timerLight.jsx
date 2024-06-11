import { getDatabase, ref, onValue, update } from "firebase/database";
import { useState, useEffect } from "react";

export default function LightHomeRightTimer({ setCheck, check }) {
  const [lights, setLights] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [currentLight, setCurrentLight] = useState(null);
  const [newStartTimer, setNewStartTimer] = useState("");
  const [newEndTimer, setNewEndTimer] = useState("");

  useEffect(() => {
    const db = getDatabase();
    const dbRef = ref(db, "device01/light");

    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        setLights(snapshot.val());
      } else {
        console.log("Không tìm thấy dữ liệu");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSave = () => {
    if (!currentLight) return;

    const db = getDatabase();
    const dbRef = ref(db, `device01/light/${currentLight}/timer`);

    update(dbRef, {
      start: newStartTimer,
      end: newEndTimer,
    })
      .then(() => {
        setEditMode(false);
        setCurrentLight(null);
      })
      .catch((error) => {
        console.error("Error updating data: ", error);
      });
  };

  const handleToggleTimerState = (lightId) => {
    const db = getDatabase();
    const dbRef = ref(db, `device01/light/${lightId}/timer`);
    const newTimerState =
      lights[lightId].timer.stateTimer === "ON" ? "OFF" : "ON";
    const updates = {
      stateTimer: newTimerState,
    };

    if (newTimerState === "OFF") {
      updates.start = "Chưa thiết lập";
      updates.end = "Chưa thiết lập";
    }

    update(dbRef, updates)
      .then(() => {
        setLights((prevLights) => ({
          ...prevLights,
          [lightId]: {
            ...prevLights[lightId],
            timer: {
              ...prevLights[lightId].timer,
              stateTimer: newTimerState,
              start:
                newTimerState === "OFF"
                  ? "Chưa thiết lập"
                  : prevLights[lightId].timer.start,
              end:
                newTimerState === "OFF"
                  ? "Chưa thiết lập"
                  : prevLights[lightId].timer.end,
            },
          },
        }));
      })
      .catch((error) => {
        console.error("Error updating stateTimer: ", error);
      });
  };

  return (
    <div>
      <div className="bg-gray-200 shadow-2xl h-[calc(100vh-70px-50px-25px-25px)] flex flex-col justify-between">
        <div className="flex flex-wrap justify-evenly m-4">
          {Object.keys(lights).map((lightId) => {
            const light = lights[lightId];
            const timer = light.timer;

            return (
              <div
                key={lightId}
                className="bg-slate-700 text-white px-4 py-2 rounded lg:w-60 lg:h-40 w-40 h-30 flex flex-col mb-4"
              >
                <div className="flex flex-col justify-center grow font-bold">
                  <div className="flex flex-row justify-between items-center">
                    <div>Giờ bắt đầu:</div>
                    {editMode && currentLight === lightId ? (
                      <input
                        type="time"
                        value={newStartTimer}
                        onChange={(e) => setNewStartTimer(e.target.value)}
                        className="text-black"
                      />
                    ) : (
                      <div>{timer.start}</div>
                    )}
                  </div>

                  <div className="flex flex-row justify-between items-center">
                    <div>Giờ kết thúc:</div>
                    {editMode && currentLight === lightId ? (
                      <input
                        type="time"
                        value={newEndTimer}
                        onChange={(e) => setNewEndTimer(e.target.value)}
                        className="text-black"
                      />
                    ) : (
                      <div>{timer.end}</div>
                    )}
                  </div>
                </div>
                <div className="flex flex-row justify-between items-center font-semibold">
                  <div>{light.name}</div>
                  <button
                    className={`rounded-2xl py-1 px-6 ${
                      timer.stateTimer === "ON" ? "bg-green-700" : "bg-red-600"
                    }`}
                    onClick={() => handleToggleTimerState(lightId)}
                  >
                    {timer.stateTimer}
                  </button>
                </div>
                <div className="flex justify-center mt-4">
                  {editMode && currentLight === lightId ? (
                    <button
                      className="bg-blue-500 text-white rounded-2xl py-1 px-6"
                      onClick={handleSave}
                    >
                      Lưu
                    </button>
                  ) : (
                    <button
                      className={`rounded-2xl py-1 px-6 ${
                        timer.stateTimer === "ON"
                          ? "bg-yellow-500 text-white"
                          : "bg-gray-400 text-white cursor-not-allowed"
                      }`}
                      onClick={() => {
                        if (timer.stateTimer === "ON") {
                          setEditMode(true);
                          setCurrentLight(lightId);
                          setNewStartTimer(timer.start);
                          setNewEndTimer(timer.end);
                        }
                      }}
                      disabled={timer.stateTimer !== "ON"}
                    >
                      Chỉnh sửa
                    </button>
                  )}
                </div>
              </div>
            );
          })}
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
