import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
export default function TemAndHumHomeRight() {
  const [temp, setTemp] = useState("");
  const [hum, setHum] = useState("");

  useEffect(() => {
    const db = getDatabase();
    const dbRef = ref(db, "device01/temAndHum/temAndHum01");

    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        setTemp(snapshot.val().temp);
        setHum(snapshot.val().hum);
      } else {
        console.log("Không tìm thấy dữ liệu");
      }
    });
    return () => unsubscribe();
  }, []);
  return (
    <div>
      <div className=" bg-gray-200 shadow-2xl h-[calc(100vh-70px-50px-25px-25px)] flex flex-col justify-between">
        <div className="flex flex-col items-center px-4 py-8">
          <div className="flex flex-row justify-evenly mb-2">
            <div className="bg-cyan-300 text-white font-bold px-4 py-2 rounded lg:w-60 lg:h-40 w-40 h-30 lg:mr-6  mr-2  flex flex-col lg:text-base text-xs">
              <div className="flex flex-row grow items-center justify-evenly">
                <div className="flex flex-col items-center">
                  <div>Nhiệt độ</div>
                  <div className="text-4xl">{temp}°</div>
                </div>
                <div className="flex flex-col items-center">
                  <div>Độ ẩm</div>
                  <div className="text-4xl">{hum}%</div>
                </div>
              </div>
              <div className="text-center font-medium text-uit bg-white rounded-xl">
                <div>Phòng Khách</div>
              </div>
            </div>
            <div className="bg-cyan-300 text-white font-bold px-4 py-2 rounded lg:w-60 lg:h-40 w-40 h-30 lg:mr-6  mr-2  flex flex-col lg:text-base text-xs ">
              <div className="flex flex-row grow items-center justify-evenly">
                <div className="flex flex-col items-center">
                  <div>Nhiệt độ</div>
                  <div className="text-4xl">{temp}°</div>
                </div>
                <div className="flex flex-col items-center">
                  <div>Độ ẩm</div>
                  <div className="text-4xl">{hum}%</div>
                </div>
              </div>
              <div className="text-center font-medium text-uit bg-white rounded-xl">
                <div>Phòng Ngủ</div>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-evenly mb-2">
            <div className="bg-cyan-300 text-white font-bold px-4 py-2 rounded lg:w-60 lg:h-40 w-40 h-30 lg:mr-6  mr-2  flex flex-col lg:text-base text-xs">
              <div className="flex flex-row grow items-center justify-evenly">
                <div className="flex flex-col items-center">
                  <div>Nhiệt độ</div>
                  <div className="text-4xl">{temp}°</div>
                </div>
                <div className="flex flex-col items-center">
                  <div>Độ ẩm</div>
                  <div className="text-4xl">{hum}%</div>
                </div>
              </div>
              <div className="text-center font-medium text-uit bg-white rounded-xl">
                <div>Phòng Ăn</div>
              </div>
            </div>
            <div className="bg-cyan-300 text-white font-bold px-4 py-2 rounded lg:w-60 lg:h-40 w-40 h-30 lg:mr-6  mr-2  flex flex-col lg:text-base text-xs">
              <div className="flex flex-row grow items-center justify-evenly">
                <div className="flex flex-col items-center">
                  <div>Nhiệt độ</div>
                  <div className="text-4xl">{temp}°</div>
                </div>
                <div className="flex flex-col items-center">
                  <div>Độ ẩm</div>
                  <div className="text-4xl">{hum}%</div>
                </div>
              </div>
              <div className="text-center font-medium text-uit bg-white rounded-xl">
                <div>Phòng bếp</div>
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
