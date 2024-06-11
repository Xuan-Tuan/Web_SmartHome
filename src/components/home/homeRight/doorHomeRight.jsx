import { useState, useEffect } from "react";
import {
  getDatabase,
  ref,
  onValue,
  update,
  remove,
  set,
} from "firebase/database";
import { FaDoorOpen, FaDoorClosed } from "react-icons/fa6";

export default function DoorHomeRight() {
  const [doors, setDoors] = useState([]);
  const [showAddDoorModal, setShowAddDoorModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [newDoorName, setNewDoorName] = useState("");
  const [doorToDelete, setDoorToDelete] = useState(null);

  useEffect(() => {
    const db = getDatabase();
    const dbRef = ref(db, "device01/door");

    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const doorsData = snapshot.val();
        const doorsList = Object.keys(doorsData).map((key) => ({
          id: key,
          ...doorsData[key],
        }));
        setDoors(doorsList);
      } else {
        console.log("Không tìm thấy dữ liệu");
      }
    });
    return () => unsubscribe();
  }, []);

  const getButtonColor = (state) => {
    return state === "ON" ? "bg-green-700" : "bg-red-500";
  };

  const toggleDoorState = (doorId, currentState) => {
    const db = getDatabase();
    const dbRef = ref(db, `device01/door/${doorId}`);
    const newState = currentState === "ON" ? "OFF" : "ON";
    update(dbRef, { state: newState })
      .then(() => {
        setDoors((prevDoors) =>
          prevDoors.map((door) =>
            door.id === doorId ? { ...door, state: newState } : door
          )
        );
      })
      .catch((error) => {
        console.error("Error updating state:", error);
      });
  };

  const addNewDoor = () => {
    const db = getDatabase();
    const dbRef = ref(db, "device01/door");

    // Tính toán tên cửa mới
    const currentDoorNumbers = doors.map((door) =>
      parseInt(door.id.replace("door", ""))
    );
    const newDoorNumber =
      currentDoorNumbers.length > 0 ? Math.max(...currentDoorNumbers) + 1 : 1;
    const newDoorId = `door${String(newDoorNumber).padStart(2, "0")}`;

    const newDoorData = {
      name: newDoorName,
      state: "OFF",
    };

    set(ref(db, `device01/door/${newDoorId}`), newDoorData)
      .then(() => {
        setNewDoorName("");
        setShowAddDoorModal(false);
      })
      .catch((error) => {
        console.error("Error adding new door:", error);
      });
  };

  const confirmDeleteDoor = (doorId) => {
    setDoorToDelete(doorId);
    setShowDeleteConfirmModal(true);
  };

  const deleteDoor = () => {
    const db = getDatabase();
    const dbRef = ref(db, `device01/door/${doorToDelete}`);

    remove(dbRef)
      .then(() => {
        setDoors((prevDoors) =>
          prevDoors.filter((door) => door.id !== doorToDelete)
        );
        setShowDeleteConfirmModal(false);
        setDoorToDelete(null);
      })
      .catch((error) => {
        console.error("Error deleting door:", error);
      });
  };

  return (
    <>
      <div className="bg-gray-200 shadow-2xl flex flex-col justify-between">
        <div className="flex justify-evenly flex-wrap mb-2 p-4">
          {doors.map((door) => (
            <div
              key={door.id}
              className="bg-stone-500 text-white px-4 py-2 rounded lg:w-80 lg:h-40 w-60 h-30 flex flex-col lg:text-base text-xs m-4"
            >
              <div className="grow flex items-center">
                {door.state === "ON" ? (
                  <FaDoorOpen size={40} />
                ) : (
                  <FaDoorClosed size={40} />
                )}
              </div>
              <div className="flex flex-row justify-between items-center font-semibold">
                <div>{door.name}</div>
                <button
                  className={`${getButtonColor(
                    door.state
                  )} rounded-2xl py-1 px-6 ml-6 hover:bg-green-800 transition duration-300 ease-in-out`}
                  onClick={() => toggleDoorState(door.id, door.state)}
                >
                  {door.state}
                </button>
                <button
                  className="bg-red-700 text-white rounded-2xl py-1 px-6 ml-6 hover:bg-red-800 transition duration-300 ease-in-out"
                  onClick={() => confirmDeleteDoor(door.id)}
                >
                  DELETE
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center p-4 bg-white shadow-md items-center">
          <button
            className="bg-uit text-white px-4 py-2 text-center rounded-xl w-40 hover:bg-uit-dark transition duration-300 ease-in-out"
            onClick={() => setShowAddDoorModal(true)}
          >
            ADD NEW DOOR
          </button>
        </div>
      </div>

      {showAddDoorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl mb-4">Thêm cửa mới</h2>
            <input
              type="text"
              className="border p-2 mb-4 w-full"
              placeholder="Tên cửa"
              value={newDoorName}
              onChange={(e) => setNewDoorName(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600 transition duration-300 ease-in-out"
                onClick={() => setShowAddDoorModal(false)}
              >
                Hủy
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 ease-in-out"
                onClick={addNewDoor}
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
            <p>Bạn có chắc chắn muốn xóa cửa này không?</p>
            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600 transition duration-300 ease-in-out"
                onClick={() => setShowDeleteConfirmModal(false)}
              >
                Hủy
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300 ease-in-out"
                onClick={deleteDoor}
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
