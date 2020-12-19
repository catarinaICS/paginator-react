import React from "react";
import {
  TextFields as TextFieldsIcon,
  Style as StyleIcon,
} from "@material-ui/icons";
import { useNode, UserComponent } from "@craftjs/core";
import { makeStyles, Typography, TypographyProps } from "@material-ui/core";
import {
  TextComponentType,
  TextEditTabsPanels,
  TextMainSettings,
} from "./TextSettings";

export const defaultTextProps = {
  content: "Text",
  color: "#000",
	fontSize: 1,
	align: 'inherit'
};

const TextComponent: UserComponent<TextComponentType> = ({
  content,
  color,
	fontSize,
	align
}) => {
  const {
    connectors: { connect, drag },
  } = useNode((node) => {
    return {};
  });

  const useStyles = makeStyles({
    root: {
      color,
      fontSize: `${fontSize}rem`,
    },
  });

  const classes = useStyles();

  return (
    <Typography classes={classes} ref={(ref) => connect(drag(ref))} align={align as TypographyProps["align"]}>
      {content}
    </Typography>
  );
};

export default TextComponent;

TextComponent.craft = {
  displayName: "Text",
  name: "Text",
  props: defaultTextProps,
  //@ts-expect-error
  custom: {
    otherTabs: [
      {
        label: <StyleIcon />,
        value: 1,
      },
    ],
  },
  related: {
    mainTab: TextMainSettings,
    mainTabIcon: TextFieldsIcon,
    otherTabsContent: TextEditTabsPanels,
  },
};
