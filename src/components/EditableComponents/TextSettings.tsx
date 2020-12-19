import React from "react";
import { useNode, Node } from "@craftjs/core";
import {
  Box,
  FormControl,
  FormLabel,
  Grid,
	MenuItem,
	Select,
  Slider,
  TextField,
	TypographyProps,
} from "@material-ui/core";
import { EditMenuTabsContext } from "contexts/EditMenuTabsContext";
import ColorPicker from "material-ui-color-picker";

export type TextComponentType = {
	content: string,
	color: string,
	fontSize: number
	align: string
};

const alignOptions = [
	['inherit', 'Inherit'],
	['left', 'Left'],
	['center', 'Center'],
	['right', 'Right'],
	['justify', 'Justify'],
]

const mapNode = (node: Node): TextComponentType => ({
	content: node.data.props.content,
	color: node.data.props.color,
	fontSize: node.data.props.fontSize,
	align: node.data.props.align,
})

export const TextMainSettings: React.FC = () => {
  const {
    actions: { setProp },
    content,
  } = useNode(mapNode);

  return (
    <Grid>
      <FormControl size="small" component="fieldset">
        <FormLabel component="legend">Content</FormLabel>
        <TextField
          multiline
          variant="outlined"
          value={content}
          onChange={(e) =>
            setProp((props) => (props.content = e.target.value), 500)
          }
        />
      </FormControl>
    </Grid>
  );
};

export const TextEditTabsPanels: React.FC = () => {
  const currentTab = React.useContext(EditMenuTabsContext);

  const {
    actions: { setProp },
    color,
		fontSize,
		align
  } = useNode(mapNode);

  return (
    <>
      <div role="tabpanel" hidden={currentTab !== 1}>
        {currentTab === 1 && (
          <Grid container direction="column">
            <Box py={2}>
              <FormLabel component="legend">Color</FormLabel>
              <ColorPicker
                name="color"
                defaultValue="#000"
                value={color}
                onChange={(color) =>
                  setProp((props) => (props.color = color), 500)
                }
              />
            </Box>
            <Box py={2}>
              <Grid container justify="space-between">
                <FormLabel component="legend">Font size</FormLabel>
                <FormLabel component="legend">{fontSize}</FormLabel>
              </Grid>
              <Slider
                defaultValue={1}
                step={0.25}
                min={0.5}
                max={6}
                value={fontSize}
                onChange={(_e, v) =>
                  setProp((props) => (props.fontSize = v), 500)
                }
              />
            </Box>
						<Box py={2}>
							<FormLabel component="legend">Text align</FormLabel>
							<Select
          			value={align}
          			onChange={(e) => setProp((props) => (props.align = e.target.value), 500)}
        			>
								{
									alignOptions.map(([value, label]) => (
										<MenuItem value={value}>{label}</MenuItem>

									))
								}
        </Select>
						</Box>
          </Grid>
        )}
      </div>
    </>
  );
};
