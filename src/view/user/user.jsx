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
        <div>{children}</div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}
