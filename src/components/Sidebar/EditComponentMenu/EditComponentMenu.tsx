import React, { useState } from "react";
import { useEditor } from "@craftjs/core";
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  IconButton,
} from "@material-ui/core";
import Close from "@material-ui/icons/Close";

import { EditMenuTabsContext } from "contexts/EditMenuTabsContext";
import "./editComponentMenu.scss";
import MenuTabs from "./MenuTabs";

const EditComponentMenu: React.FC = () => {
  const [tab, setTab] = useState(0);

  const { actions, selected } = useEditor((state, query) => {
    const currentNodeId = state.events.selected;
    let selected;

    if (currentNodeId) {
      const node = state.nodes[currentNodeId];

      selected = {
        id: currentNodeId,
        name: node.data.displayName,
        isDeletable: query.node(currentNodeId).isDeletable(),
        mainTab: node.related && node.related.mainTab,
        mainTabIcon: node.related && node.related.mainTabIcon,
        otherTabsContent: node.related && node.related.otherTabsContent,
        otherTabs: node.data.custom && node.data.custom.otherTabs,
      };
    }

    return {
      selected,
    };
  });

  const handleTabChange = (e: React.ChangeEvent<{}>, v: any) => {
    setTab(v);
  };

  const closeMenu = () => {
    setTab(0);
    actions.selectNode(undefined);
  }

  return selected ? (
    <EditMenuTabsContext.Provider value={tab}>
      <div className="editComponentMenu">
        <Paper variant="outlined">
          <MenuTabs
            handleTabChange={handleTabChange}
            currentTab={tab}
            selected={selected}
          />

          <Grid
            container
            justify="space-between"
            alignItems="center"
            className="header"
          >
            <Typography variant="h6">{selected.name}</Typography>
            <IconButton
              aria-label="close"
              onClick={closeMenu}
            >
              <Close />
            </IconButton>
          </Grid>

          {selected.mainTab && (
            <div hidden={tab !== 0}>
              {tab === 0 &&
                selected.mainTab &&
                React.createElement(selected.mainTab)}
            </div>
          )}

          {selected.otherTabsContent &&
            React.createElement(selected.otherTabsContent)}

          {selected.isDeletable ? (
            <Box mt={4}>
              <Button
                variant="contained"
                color="default"
                onClick={() => {
                  actions.delete(selected.id);
                }}
              >
                Delete
              </Button>
            </Box>
          ) : null}
        </Paper>
      </div>
    </EditMenuTabsContext.Provider>
  ) : null;
};

export default EditComponentMenu;
