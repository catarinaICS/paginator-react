import React from "react";
import EditComponentMenu from "components/Sidebar/EditComponentMenu/EditComponentMenu";
import AddItemsMenu from "./AddItemsMenu";

const SideBar = () => {
  return (
    <div className="sideBar">
      <EditComponentMenu />
      <div className="addItemsMenu">
        <AddItemsMenu />
      </div>
    </div>
  );
};

export default SideBar;
