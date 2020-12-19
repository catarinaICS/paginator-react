import { Tooltip, IconButton } from "@material-ui/core";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import TextFields from "@material-ui/icons/TextFields";
import React from "react";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useEditor } from "@craftjs/core";
import TextComponent, { defaultTextProps } from "components/EditableComponents/TextComponent";

const AddItemsMenu: React.FC = () => {
  const { connectors } = useEditor();

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
      <Tooltip title="Add text" placement="right" arrow>
        <IconButton
          ref={(ref) =>
            connectors.create(
              ref,
              <TextComponent {...defaultTextProps} />
            )
          }
        >
          <TextFields />
        </IconButton>
      </Tooltip>
      {/* <Tooltip title="Add container" placement="right" arrow>
        <IconButton>
          <CheckBoxOutlineBlankIcon />
        </IconButton>
      </Tooltip> */}
    </Paper>
  );
};
export default AddItemsMenu;
