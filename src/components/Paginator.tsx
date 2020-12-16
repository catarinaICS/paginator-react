import React from "react";
import PageContextProvider from "../contexts/PageContext";
import SideBar from "./SideBar";
import Page from "./Page";
import "./styles.scss";

const Paginator = () => {
  return (
    <PageContextProvider>
      <div>
        <SideBar />
        <div style={{ width: "100%" }}>
          <Page />
        </div>
      </div>
    </PageContextProvider>
  );
};
export default Paginator;
