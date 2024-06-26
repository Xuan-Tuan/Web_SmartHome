// import React, { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import { getDatabase, ref, onValue } from "firebase/database";
// import { GiCeilingLight } from "react-icons/gi";
// import { GiComputerFan } from "react-icons/gi";
// import { GiDoorway } from "react-icons/gi";
// import { WiHumidity } from "react-icons/wi";
// import { FaTemperatureHigh } from "react-icons/fa6";
// import axios from "axios";

// export default function HomeLeft() {
//   const [temp, setTemp] = useState("");
//   const [hum, setHum] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `https://api.openweathermap.org/data/2.5/weather?lat=10.8493&lon=106.7537&appid=05e89b040c9ca6ccc33fbdd46c4c3272&units=metric`
//         );

//         setTemp(response.data.main.temp);
//         setHum(response.data.main.humidity);
//       } catch (error) {
//         console.error("Error fetching weather data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const navLinkClass = ({ isActive }) =>
//     isActive
//       ? "bg-uit shadow-md text-white px-4 py-2 border-2 border-uit rounded-lg lg:w-60 lg:h-40 w-40 h-30  flex flex-col font-bold "
//       : "bg-white shadow-md text-uit px-4 py-2 border-2 border-uit rounded-lg lg:w-60 lg:h-40 w-40 h-30  flex flex-col font-bold";

//   return (
//     <>
//       <div className="bg-white shadow-md ">
//         <div className="flex flex-row items-center justify-evenly lg:p-4 p-2">
//           <div className="flex lg:flex-row  flex-col items-center gap-2 mt-2 border-4 border-uit rounded-xl lg:p-4 p-2 bg-white shadow-md">
//             <div className="text-uit lg:text-base text-sm font-bold">
//               Nhiệt độ:{" "}
//             </div>
//             <div className="lg:text-xl text-base font-bold text-red-600">
//               {temp}°C
//             </div>
//           </div>
//           <div className="flex lg:flex-row flex-col items-center gap-2 mt-2 border-4 border-uit rounded-xl lg:p-4 p-2 bg-white shadow-md">
//             <div className="text-uit lg:text-base text-sm font-bold">
//               Độ ẩm:
//             </div>
//             <div className="lg:text-xl text-base font-bold text-red-600">
//               {hum}%
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-col items-center p-4 space-y-6">
//           <div className="flex flex-row justify-evenly mb-2 space-x-10">
//             <div>
//               <NavLink to="/user/home/light" className={navLinkClass}>
//                 <div className=" flex items-center grow">
//                   <GiCeilingLight size={60} />
//                 </div>
//                 <div>Đèn </div>
//                 <div>Số lượng: </div>
//               </NavLink>
//             </div>
//             <div>
//               <NavLink to="/user/home/fan" className={navLinkClass}>
//                 <div className="grow flex items-center">
//                   <GiComputerFan size={60} />
//                 </div>
//                 <div>Quạt </div>
//                 <div>Số lượng: </div>
//               </NavLink>
//             </div>
//           </div>
//           <div className="flex flex-row justify-evenly mb-2 space-x-10">
//             <div>
//               <NavLink to="/user/home/door" className={navLinkClass}>
//                 <div className="grow flex items-center">
//                   <GiDoorway size={60} />
//                 </div>
//                 <div>Cửa </div>
//                 <div>Số lượng: </div>
//               </NavLink>
//             </div>
//             <div>
//               <NavLink to="/user/home/temandhum" className={navLinkClass}>
//                 <div className="grow flex items-center justify-evenly">
//                   <FaTemperatureHigh size={40} />
//                   <WiHumidity size={40} />
//                 </div>
//                 <div>Nhiệt độ, độ ẩm </div>
//                 <div>Số lượng: </div>
//               </NavLink>
//             </div>
//           </div>
//         </div>
//         <div className="flex flex-row justify-center items-center">
//           <div className="text-lg text-black">Số lượng thiết bị: </div>
//           <div className="text-white text-xl bg-gray-400 rounded-xl px-4">
//             4
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getDatabase, ref, onValue } from "firebase/database";
import { GiCeilingLight, GiComputerFan, GiDoorway } from "react-icons/gi";
import { WiHumidity } from "react-icons/wi";
import { FaTemperatureHigh } from "react-icons/fa6";
import axios from "axios";

export default function HomeLeft() {
  const [temp, setTemp] = useState("");
  const [hum, setHum] = useState("");
  const [deviceCounts, setDeviceCounts] = useState({
    light: 0,
    fan: 0,
    door: 0,
    temAndHum: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=10.8493&lon=106.7537&appid=05e89b040c9ca6ccc33fbdd46c4c3272&units=metric`
        );

        setTemp(response.data.main.temp);
        setHum(response.data.main.humidity);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const db = getDatabase();
    const dbRef = ref(db, "device01");

    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();

        setDeviceCounts({
          light: Object.keys(data.light || {}).length,
          fan: Object.keys(data.fan || {}).length,
          door: Object.keys(data.door || {}).length,
          temAndHum: Object.keys(data.temAndHum || {}).length,
        });
      } else {
        console.log("Không tìm thấy dữ liệu");
      }
    });

    return () => unsubscribe();
  }, []);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "bg-uit shadow-md text-white px-4 py-2 border-2 border-uit rounded-lg lg:w-60 lg:h-40 w-40 h-30 flex flex-col font-bold"
      : "bg-white shadow-md text-uit px-4 py-2 border-2 border-uit rounded-lg lg:w-60 lg:h-40 w-40 h-30 flex flex-col font-bold";

  return (
    <>
      <div className="bg-white shadow-md">
        <div className="flex flex-row items-center justify-evenly lg:p-4 p-2">
          <div className="flex lg:flex-row flex-col items-center gap-2 mt-2 border-4 border-uit rounded-xl lg:p-4 p-2 bg-white shadow-md">
            <div className="text-uit lg:text-base text-sm font-bold">
              Nhiệt độ:{" "}
            </div>
            <div className="lg:text-xl text-base font-bold text-red-600">
              {temp}°C
            </div>
          </div>
          <div className="flex lg:flex-row flex-col items-center gap-2 mt-2 border-4 border-uit rounded-xl lg:p-4 p-2 bg-white shadow-md">
            <div className="text-uit lg:text-base text-sm font-bold">
              Độ ẩm:
            </div>
            <div className="lg:text-xl text-base font-bold text-red-600">
              {hum}%
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center p-4 space-y-6">
          <div className="flex flex-row justify-evenly mb-2 space-x-10">
            <div>
              <NavLink to="/user/home/light" className={navLinkClass}>
                <div className="flex items-center grow">
                  <GiCeilingLight size={60} />
                </div>
                <div>Đèn </div>
                <div>Số lượng: {deviceCounts.light}</div>
              </NavLink>
            </div>
            <div>
              <NavLink to="/user/home/fan" className={navLinkClass}>
                <div className="grow flex items-center">
                  <GiComputerFan size={60} />
                </div>
                <div>Quạt </div>
                <div>Số lượng: {deviceCounts.fan}</div>
              </NavLink>
            </div>
          </div>
          <div className="flex flex-row justify-evenly mb-2 space-x-10">
            <div>
              <NavLink to="/user/home/door" className={navLinkClass}>
                <div className="grow flex items-center">
                  <GiDoorway size={60} />
                </div>
                <div>Cửa </div>
                <div>Số lượng: {deviceCounts.door}</div>
              </NavLink>
            </div>
            <div>
              <NavLink to="/user/home/temandhum" className={navLinkClass}>
                <div className="grow flex items-center justify-evenly">
                  <FaTemperatureHigh size={40} />
                  <WiHumidity size={40} />
                </div>
                <div>Nhiệt độ, độ ẩm </div>
                <div>Số lượng: {deviceCounts.temAndHum}</div>
              </NavLink>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center">
          <div className="text-lg text-black">Tổng số thiết bị: </div>
          <div className="text-white text-xl bg-gray-400 rounded-xl px-4">
            {Object.values(deviceCounts).reduce((acc, count) => acc + count, 0)}
          </div>
        </div>
      </div>
    </>
  );
}
