import { useState, useEffect } from "react";
import {
  getDatabase,
  ref,
  onValue,
  update,
  set,
  remove,
} from "firebase/database";
import { TbCarFan1, TbCarFan2, TbCarFan3 } from "react-icons/tb";

export default function FanHomeRight() {
  const [fans, setFans] = useState([]);
  const [showAddFanModal, setShowAddFanModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [newFanName, setNewFanName] = useState("");
  const [fanToDelete, setFanToDelete] = useState(null);

  useEffect(() => {
    const db = getDatabase();
    const dbRef = ref(db, "device01/fan");

    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const fansData = snapshot.val();
        const fansList = Object.keys(fansData).map((key) => ({
          id: key,
          ...fansData[key],
        }));
        setFans(fansList);
      } else {
        console.log("Không tìm thấy dữ liệu");
      }
    });
    return () => unsubscribe();
  }, []);

  const updateFanState = (fanId, newState) => {
    const db = getDatabase();
    const dbRef = ref(db, `device01/fan/${fanId}`);
    update(dbRef, { state: newState });
  };

  const getIconStyle = (state, level) => ({
    size: state === level ? 50 : 30,
    color: state === level ? "#ef4444" : "#a3a3a3",
  });

  const getOffButtonColor = (state) => {
    return state === "OFF" ? "bg-red-600" : "bg-green-600";
  };

  const addNewFan = () => {
    const db = getDatabase();
    const dbRef = ref(db, "device01/fan");

    const currentFanNumbers = fans.map((fan) =>
      parseInt(fan.id.replace("fan", ""))
    );
    const newFanNumber =
      currentFanNumbers.length > 0 ? Math.max(...currentFanNumbers) + 1 : 1;
    const newFanId = `fan${String(newFanNumber).padStart(2, "0")}`;

    const newFanData = {
      name: newFanName,
      state: "OFF",
    };

    set(ref(db, `device01/fan/${newFanId}`), newFanData)
      .then(() => {
        setNewFanName("");
        setShowAddFanModal(false);
      })
      .catch((error) => {
        console.error("Error adding new fan:", error);
      });
  };

  const confirmDeleteFan = (fanId) => {
    setFanToDelete(fanId);
    setShowDeleteConfirmModal(true);
  };

  const deleteFan = () => {
    const db = getDatabase();
    const dbRef = ref(db, `device01/fan/${fanToDelete}`);

    remove(dbRef)
      .then(() => {
        setFans((prevFans) => prevFans.filter((fan) => fan.id !== fanToDelete));
        setShowDeleteConfirmModal(false);
        setFanToDelete(null);
      })
      .catch((error) => {
        console.error("Error deleting fan:", error);
      });
  };

  return (
    <>
      <div className="bg-gray-200 shadow-2xl flex flex-col justify-between">
        <div className="flex flex-wrap justify-evenly mb-2 p-4">
          {fans.map((fan) => (
            <div
              key={fan.id}
              className="bg-white shadow-md text-black px-4 py-2 rounded lg:w-80 lg:h-40 w-60 h-30 flex flex-col lg:text-base text-xs m-4"
            >
              <div className="flex flex-row grow justify-evenly items-center">
                <button
                  className="bg-white p-2 rounded-xl flex-1 mr-2 flex items-center"
                  onClick={() => updateFanState(fan.id, "LOW")}
                >
                  <TbCarFan1
                    size={getIconStyle(fan.state, "LOW").size}
                    color={getIconStyle(fan.state, "LOW").color}
                  />
                </button>
                <button
                  className="bg-white p-2 rounded-xl flex-1 mr-2 flex items-center"
                  onClick={() => updateFanState(fan.id, "MEDIUM")}
                >
                  <TbCarFan2
                    size={getIconStyle(fan.state, "MEDIUM").size}
                    color={getIconStyle(fan.state, "MEDIUM").color}
                  />
                </button>
                <button
                  className="bg-white p-2 rounded-xl flex-1 mr-2 flex items-center"
                  onClick={() => updateFanState(fan.id, "HIGH")}
                >
                  <TbCarFan3
                    size={getIconStyle(fan.state, "HIGH").size}
                    color={getIconStyle(fan.state, "HIGH").color}
                  />
                </button>
              </div>
              <div className="flex flex-row items-center justify-between">
                <div className="text-uit font-semibold">{fan.name}</div>
                <div>
                  <button
                    className={`${getOffButtonColor(
                      fan.state
                    )} text-white rounded-2xl py-1 px-6 hover:bg-red-700 transition duration-300 ease-in-out`}
                    onClick={() => updateFanState(fan.id, "OFF")}
                  >
                    OFF
                  </button>
                </div>
                <div className="flex justify-end">
                  <button
                    className="bg-red-700 text-white rounded-2xl py-1 px-6 ml-6 hover:bg-red-800 transition duration-300 ease-in-out"
                    onClick={() => confirmDeleteFan(fan.id)}
                  >
                    DELETE
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center p-4 bg-white shadow-md items-center">
          <button
            className="bg-uit text-white px-4 py-2 text-center rounded-xl w-40 hover:bg-uit-dark transition duration-300 ease-in-out"
            onClick={() => setShowAddFanModal(true)}
          >
            Thêm quạt mới
          </button>
        </div>
      </div>

      {showAddFanModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl mb-4">Thêm quạt mới</h2>
            <input
              type="text"
              className="border p-2 mb-4 w-full"
              placeholder="Tên quạt"
              value={newFanName}
              onChange={(e) => setNewFanName(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600 transition duration-300 ease-in-out"
                onClick={() => setShowAddFanModal(false)}
              >
                Hủy
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 ease-in-out"
                onClick={addNewFan}
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
            <p>Bạn có chắc chắn muốn xóa quạt này không?</p>
            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600 transition duration-300 ease-in-out"
                onClick={() => setShowDeleteConfirmModal(false)}
              >
                Hủy
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300 ease-in-out"
                onClick={deleteFan}
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
