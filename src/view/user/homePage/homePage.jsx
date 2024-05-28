import HomeLeft from "../../../components/home/homeLeft";

export default function HomePage({ children }) {
  return (
    <div className="flex lg:flex-row flex-col justify-between items-center mx-4 lg:space-x-6 space-y-4  mt-20">
      <div className="lg:w-1/2 w-2/3 ">
        <HomeLeft />
      </div>
      <div className="lg:w-1/2 w-2/3 ">{children}</div>
    </div>
  );
}
