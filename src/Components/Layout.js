import React from "react";
import Header from "./Header/Header";
import '../Styles/Globalstyle.css';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="container">{children}</div>
    </>
  );
};

export default Layout;
