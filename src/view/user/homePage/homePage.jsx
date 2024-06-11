import HomeLeft from "../../../components/home/homeLeft";

export default function HomePage({ children }) {
  return (
    <div className="lg:h-[calc(100vh-70px-50px-20px-20px)] h-auto mt-[90px] mb-[70px]  flex lg:flex-row flex-col justify-between items-center lg:mx-4 mx-2 lg:space-x-6 space-y-4 ">
      <div className="lg:w-1/2 w-full md:w-2/3 ">
        <HomeLeft />
      </div>
      <div className="lg:w-1/2 w-full md:w-2/3 ">{children}</div>
    </div>
  );
}
