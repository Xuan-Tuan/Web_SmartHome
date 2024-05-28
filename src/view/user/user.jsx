import React from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";

export default function User({ children }) {
  return (
    <>
      <div className="">
        <div>
          <Header />
        </div>
        <div className="lg:h-[calc(100vh-70px-50px-20px-20px)] mt-[70px] mb-[50px] h-auto">
          {children}
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}
