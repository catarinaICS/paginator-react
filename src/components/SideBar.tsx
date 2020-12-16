import React from "react";
import EditComponentMenu from "./EditComponent/EditComponentMenu";
import Menu from "./Menu";

const SideBar = () => {
  return (
    <div className="sideBar">
      <EditComponentMenu />
      <div className="addItemsMenu">
        <Menu />
      </div>
    </div>
  );
};

export default SideBar;
