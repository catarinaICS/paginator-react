import { Button, Grid, Paper, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import { PageContext } from "../../contexts/PageContext";
import EditTextForm from "./Text/EditTextForm";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import "./editComponentMenu.scss";

const getHeaderTitle = (nodeType: string) => {
  switch (nodeType) {
    case "text":
      return "Text";

    default:
      return "";
  }
};

const EditComponentMenu: React.FC = () => {
  const { editingComponent, setEditingComponent, getNode } = useContext(
    PageContext
  );

  if (!editingComponent) {
    return null;
  }

  const { nodeId, nodeParents } = editingComponent;
  const nodeToEdit = getNode(nodeId, nodeParents);

  if (!nodeToEdit) {
    return null;
  }

  const getEditingForm = () => {
    switch (nodeToEdit.type) {
      case "text":
        return <EditTextForm node={nodeToEdit} />;
      default:
        return "";
    }
  };

  return (
    <div className={`editComponentMenu ${editingComponent && "editing"}`}>
      <Paper variant="outlined">
        <Grid
          container
          justify="space-between"
          alignItems="center"
          className="header"
        >
          <Typography variant="h6">
            {getHeaderTitle(nodeToEdit.type)}
          </Typography>
          <IconButton
            aria-label="close"
            onClick={() => setEditingComponent(null)}
          >
            <Close />
          </IconButton>
        </Grid>
        {getEditingForm()}
      </Paper>
    </div>
  );
};

export default EditComponentMenu;
