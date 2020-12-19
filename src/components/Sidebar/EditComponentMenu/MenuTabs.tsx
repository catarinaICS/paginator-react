import { Tabs, Tab } from "@material-ui/core";
import React from "react";

type MenuTabsProps = {
  handleTabChange: (e: React.ChangeEvent<{}>, v: any) => void;
  currentTab: number;
  selected: Record<string, any>;
};

const MenuTabs: React.FC<MenuTabsProps> = ({ handleTabChange, currentTab, selected }) => {
  return (
    <Tabs value={currentTab} onChange={handleTabChange}>
      <Tab
        label={
          selected.mainTabIcon && React.createElement(selected.mainTabIcon)
        }
        value={0}
      />
      {selected.otherTabs &&
        selected.otherTabs.map(
          (props: { value: number; label: React.ReactNode }) => (
            <Tab {...props} />
          )
        )}
    </Tabs>
  );
};

export default MenuTabs;
