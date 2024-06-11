import { useState, useEffect } from "react";
import {
  getDatabase,
  ref,
  onValue,
  update,
  set,
  remove,
} from "firebase/database";
import { MdLightMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";

export default function LightHomeRight({ setCheck, check }) {
  const [lights, setLights] = useState([]);
  const [showAddLightModal, setShowAddLightModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [newLightName, setNewLightName] = useState("");
  const [lightToDelete, setLightToDelete] = useState(null);

  useEffect(() => {
    const db = getDatabase();
    const dbRef = ref(db, "device01/light");

    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const lightsData = snapshot.val();
        const lightsList = Object.keys(lightsData).map((key) => ({
          id: key,
          ...lightsData[key],
        }));
        setLights(lightsList);
      } else {
        console.log("Không tìm thấy dữ liệu");
      }
    });

    return () => unsubscribe();
  }, []);

  const updateLightState = (lightId) => {
    const db = getDatabase();
    const dbRef = ref(db, `device01/light/${lightId}`);
    const currentLight = lights.find((light) => light.id === lightId);
    const newState = currentLight.state === "ON" ? "OFF" : "ON";
    update(dbRef, { state: newState })
      .then(() => {
        setLights((prevLights) =>
          prevLights.map((light) =>
            light.id === lightId ? { ...light, state: newState } : light
          )
        );
      })
      .catch((error) => {
        console.error("Error updating light state: ", error);
      });
  };

  const getButtonColor = (state) => {
    return state === "ON" ? "bg-green-700" : "bg-red-600";
  };

  const getLightIcon = (state) => {
    return state === "ON" ? (
      <MdLightMode size={40} />
    ) : (
      <MdOutlineLightMode size={40} />
    );
  };

  const addNewLight = () => {
    const db = getDatabase();
    const dbRef = ref(db, "device01/light");

    const currentLightNumbers = lights.map((light) =>
      parseInt(light.id.replace("light", ""))
    );
    const newLightNumber =
      currentLightNumbers.length > 0 ? Math.max(...currentLightNumbers) + 1 : 1;
    const newLightId = `light${String(newLightNumber).padStart(2, "0")}`;

    const newLightData = {
      name: newLightName,
      state: "OFF",
      timer: {
        start: "Chưa thiết lập",
        end: "Chưa thiết lập",
        stateTimer: "OFF",
      },
    };

    set(ref(db, `device01/light/${newLightId}`), newLightData)
      .then(() => {
        setNewLightName("");
        setShowAddLightModal(false);
      })
      .catch((error) => {
        console.error("Error adding new light:", error);
      });
  };

  const confirmDeleteLight = (lightId) => {
    setLightToDelete(lightId);
    setShowDeleteConfirmModal(true);
  };

  const deleteLight = () => {
    const db = getDatabase();
    const dbRef = ref(db, `device01/light/${lightToDelete}`);

    remove(dbRef)
      .then(() => {
        setLights((prevLights) =>
          prevLights.filter((light) => light.id !== lightToDelete)
        );
        setShowDeleteConfirmModal(false);
        setLightToDelete(null);
      })
      .catch((error) => {
        console.error("Error deleting light:", error);
      });
  };

  return (
    <>
      <div className="bg-gray-200 shadow-2xl h-[calc(100vh-70px-50px-25px-25px)] flex flex-col justify-between">
        <div className="flex flex-wrap justify-evenly items-center m-4">
          {lights.map((light) => (
            <div
              key={light.id}
              className="bg-slate-700 text-white px-4 py-2 rounded lg:w-80 lg:h-40 w-60 h-30 flex flex-col m-4"
            >
              <div className="grow flex items-center justify-center">
                {getLightIcon(light.state)}
              </div>
              <div className="flex flex-row justify-between items-center font-semibold">
                <div>{light.name}</div>
                <button
                  className={`${getButtonColor(
                    light.state
                  )} rounded-2xl py-1 px-6`}
                  onClick={() => updateLightState(light.id)}
                >
                  {light.state}
                </button>
                <button
                  className="bg-red-700 text-white rounded-2xl py-1 px-6 ml-6 hover:bg-red-800 transition duration-300 ease-in-out"
                  onClick={() => confirmDeleteLight(light.id)}
                >
                  DELETE
                </button>
              </div>
            </div>
          ))}

          <IoAddCircleOutline
            className="px-4 m-4 py-2 lg:w-40 lg:h-40 w-20 h-20  flex items-center justify-center rounded-full text-uit hover:bg-uit-dark transition duration-300 ease-in-out"
            onClick={() => setShowAddLightModal(true)}
          ></IoAddCircleOutline>
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

      {showAddLightModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl mb-4">ADD NEW DEVICE</h2>
            <input
              type="text"
              className="border p-2 mb-4 w-full"
              placeholder="Tên thiết bị"
              value={newLightName}
              onChange={(e) => setNewLightName(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600 transition duration-300 ease-in-out"
                onClick={() => setShowAddLightModal(false)}
              >
                CANCEL
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 ease-in-out"
                onClick={addNewLight}
              >
                ADD
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl mb-4">Xác nhận xóa</h2>
            <p>Bạn có chắc chắn muốn xóa thiết bị này không?</p>
            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600 transition duration-300 ease-in-out"
                onClick={() => setShowDeleteConfirmModal(false)}
              >
                CANCEL
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300 ease-in-out"
                onClick={deleteLight}
              >
                DELETE
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
