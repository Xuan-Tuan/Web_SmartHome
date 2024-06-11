import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue, set, remove } from "firebase/database";

export default function TemAndHumHomeRight() {
  const [temAndHumDevices, setTemAndHumDevices] = useState([]);
  const [showAddDeviceModal, setShowAddDeviceModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [newDeviceName, setNewDeviceName] = useState("");
  const [deviceToDelete, setDeviceToDelete] = useState(null);

  useEffect(() => {
    const db = getDatabase();
    const dbRef = ref(db, "device01/temAndHum");

    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const devicesData = snapshot.val();
        const devicesList = Object.keys(devicesData).map((key) => ({
          id: key,
          ...devicesData[key],
        }));
        setTemAndHumDevices(devicesList);
      } else {
        console.log("Không tìm thấy dữ liệu");
      }
    });
    return () => unsubscribe();
  }, []);

  const addNewDevice = () => {
    const db = getDatabase();
    const dbRef = ref(db, "device01/temAndHum");

    const currentDeviceNumbers = temAndHumDevices.map((device) =>
      parseInt(device.id.replace("temAndHum", ""))
    );
    const newDeviceNumber =
      currentDeviceNumbers.length > 0
        ? Math.max(...currentDeviceNumbers) + 1
        : 1;
    const newDeviceId = `temAndHum${String(newDeviceNumber).padStart(2, "0")}`;

    const newDeviceData = {
      name: newDeviceName,
      temp: 0,
      hum: 0,
    };

    set(ref(db, `device01/temAndHum/${newDeviceId}`), newDeviceData)
      .then(() => {
        setNewDeviceName("");
        setShowAddDeviceModal(false);
      })
      .catch((error) => {
        console.error("Error adding new device:", error);
      });
  };

  const confirmDeleteDevice = (deviceId) => {
    setDeviceToDelete(deviceId);
    setShowDeleteConfirmModal(true);
  };

  const deleteDevice = () => {
    const db = getDatabase();
    const dbRef = ref(db, `device01/temAndHum/${deviceToDelete}`);

    remove(dbRef)
      .then(() => {
        setTemAndHumDevices((prevDevices) =>
          prevDevices.filter((device) => device.id !== deviceToDelete)
        );
        setShowDeleteConfirmModal(false);
        setDeviceToDelete(null);
      })
      .catch((error) => {
        console.error("Error deleting device:", error);
      });
  };

  return (
    <>
      <div className="bg-gray-200 shadow-2xl flex flex-col justify-between">
        <div className="flex flex-wrap justify-evenly mb-2 p-4">
          {temAndHumDevices.map((device) => (
            <div
              key={device.id}
              className="bg-sky-300 text-white font-bold px-4 py-2 rounded lg:w-80 lg:h-40 w-60 h-30 flex flex-col lg:text-base text-xs m-4"
            >
              <div className="flex flex-row grow items-center justify-evenly">
                <div className="flex flex-col items-center">
                  <div>Nhiệt độ</div>
                  <div className="text-4xl">{device.temp}°</div>
                </div>
                <div className="flex flex-col items-center">
                  <div>Độ ẩm</div>
                  <div className="text-4xl">{device.hum}%</div>
                </div>
              </div>
              <div className="flex flex-row justify-between items-center">
                <div className="text-center font-medium text-uit bg-white rounded-full p-2">
                  <div>{device.name}</div>
                </div>
                <div className="flex justify-end mt-2">
                  <button
                    className="bg-red-700 text-white rounded-2xl py-1 px-6 ml-6 hover:bg-red-800 transition duration-300 ease-in-out"
                    onClick={() => confirmDeleteDevice(device.id)}
                  >
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center p-4 bg-white shadow-md items-center">
          <button
            className="bg-uit text-white px-4 py-2 text-center rounded-xl w-40 hover:bg-uit-dark transition duration-300 ease-in-out"
            onClick={() => setShowAddDeviceModal(true)}
          >
            Thêm thiết bị mới
          </button>
        </div>
      </div>

      {showAddDeviceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl mb-4">Thêm thiết bị mới</h2>
            <input
              type="text"
              className="border p-2 mb-4 w-full"
              placeholder="Tên thiết bị"
              value={newDeviceName}
              onChange={(e) => setNewDeviceName(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600 transition duration-300 ease-in-out"
                onClick={() => setShowAddDeviceModal(false)}
              >
                Hủy
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 ease-in-out"
                onClick={addNewDevice}
              >
                Thêm
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
                Hủy
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300 ease-in-out"
                onClick={deleteDevice}
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
