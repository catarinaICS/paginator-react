import { Tooltip, IconButton } from "@material-ui/core";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import TextFields from "@material-ui/icons/TextFields";
import React, { useContext } from "react";
import { PageContext } from "../contexts/PageContext";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const Menu: React.FC = () => {
  const { setDraggingComponent } = useContext(PageContext);
  const useStyles = makeStyles({
    root: {
      position: "fixed",
      display: "grid",
      padding: "12px",
      marginLeft: "12px",
    },
  });

  const classes = useStyles();
  return (
    <Paper classes={classes}>
      <Tooltip title="Add container" placement="right" arrow>
        <IconButton
          draggable={true}
          onDragStart={(ev) => {
            ev.dataTransfer.setData("text/plain", "container");
            ev.dataTransfer.dropEffect = "copy";
            setDraggingComponent(true);
          }}
          onDragEnd={() => {
            setDraggingComponent(false);
          }}
        >
          <CheckBoxOutlineBlankIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Add Text" placement="right" arrow>
        <IconButton
          draggable={true}
          onDragStart={(ev) => {
            ev.dataTransfer.setData("text/plain", "text");
            ev.dataTransfer.dropEffect = "copy";
            setDraggingComponent(true);
          }}
          onDragEnd={() => {
            setDraggingComponent(false);
          }}
        >
          <TextFields />
        </IconButton>
      </Tooltip>
    </Paper>
  );
};
export default Menu;
