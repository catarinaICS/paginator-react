import React, { useContext } from "react";
import { PageContext } from "../contexts/PageContext";
import "./editableNode.scss";

type EditableNodeProps = {
  label: string;
  nodeId: string;
  nodeParents: string[];
};

const EditableNode: React.FC<EditableNodeProps> = ({
  label,
  nodeId,
  nodeParents,
  children,
}) => {
  const { editingComponent, setEditingComponent } = useContext(PageContext);
  return (
    <div
      className={`editableNode ${
        editingComponent?.nodeId === nodeId ? "editing" : ""
      }`}
      onClick={() => setEditingComponent({ nodeId, nodeParents })}
    >
      <span className="label">{label}</span>
      {children}
    </div>
  );
};
export default EditableNode;
