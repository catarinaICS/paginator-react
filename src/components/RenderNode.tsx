import { Typography } from "@material-ui/core";
import React from "react";
import { Nodes } from "../contexts/PageContext";
import Container from "./Container";
import EditableNode from "./EditableNode";

type RenderNodeProps = {
  node: Nodes;
};

const RenderNode: React.FC<RenderNodeProps> = ({ node }) => {
  switch (node.type) {
    case "container":
      return <Container {...node} />;
    case "text":
      return (
        <EditableNode label="Text" nodeId={node.id} nodeParents={node.parents}>
          <Typography {...node.props}>{node.content}</Typography>
        </EditableNode>
      );
    default:
      return <div></div>;
  }
};

export default RenderNode;
