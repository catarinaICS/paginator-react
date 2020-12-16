import {
  Grid,
  MenuItem,
  Select,
  SelectProps,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useContext } from "react";
import { PageContext } from "../../../contexts/PageContext";
import { AlignEnum, TextType } from "../../../types/nodes/Text";

type EditTextProps = {
  node: TextType;
};

const alignOptions = [
  ["inherit", "Inherit"],
  ["left", "Left"],
  ["center", "Center"],
  ["right", "Right"],
  ["justify", "Justify"],
]

const EditTextForm: React.FC<EditTextProps> = ({ node }) => {
  const { updateNode } = useContext(PageContext);
  const handleChange: SelectProps["onChange"] = (event) => {
    updateNode({
      ...node,
      props: {
        ...node.props,
        align: event.target.value as AlignEnum,
      },
    });
  };

  const updateText = (newText: string) => {
    updateNode({
      ...node,
      content: newText,
    });
  };

  return (
    <Grid className="formGrid">
      <Grid>
        <Typography className="editComponentInputLabel">Content</Typography>
        <TextField
          multiline
          variant="outlined"
          value={node.content}
          onChange={(e) => updateText(e.target.value)}
        />
      </Grid>
      <Grid>
        <Typography className="editComponentInputLabel">
          Text alignment
        </Typography>
        <Select
          variant="outlined"
          className="editComponentSelect"
          value={node.props.align || "inherit"}
          onChange={handleChange}
        >
          {alignOptions.map(([option, label]) => (
            <MenuItem value={option}>{label}</MenuItem>
          ))}
        </Select>
      </Grid>
    </Grid>
  );
};

export default EditTextForm;
