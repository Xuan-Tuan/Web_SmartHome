import React from "react";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
export default function Notification() {
  return (
    <div className="flex flex-col ">
      <div className=" text-base font-bold text-left align-middle pl-10 text-uit mt-2 mb-2">
        Thông báo
      </div>
      <div className="flex flex-col ml-20 mr-60 bg-gray-100 shadow-md gap-5 p-5 overflow-y-scroll will-change-scroll">
        <div className="flex flex-row justify-between text-center px-8 py-4 my-5 border-uit border-2">
          <div className="flex flex-col text-start text-uit text-lg font-bold">
            <p>Tiêu đề: </p>
            <p>Nội dung: </p>
          </div>
          <div>
            <IoArrowForwardCircleOutline size={40} />
          </div>
        </div>
        <div
          className="flex flex-row justify-between text-center px-8 py-4 my-5
        border-uit border-2"
        >
          <div className="flex flex-col text-start text-uit text-lg font-bold">
            <p>Tiêu đề: </p>
            <p>Nội dung: </p>
          </div>
          <div>
            <IoArrowForwardCircleOutline size={40} />
          </div>
        </div>
        <div className="flex flex-row justify-between text-center px-8 py-4 my-5 border-uit border-2">
          <div className="flex flex-col text-start text-uit text-lg font-bold">
            <p>Tiêu đề: </p>
            <p>Nội dung: </p>
          </div>
          <div>
            <IoArrowForwardCircleOutline size={40} />
          </div>
        </div>
      </div>
    </div>
  );
}
