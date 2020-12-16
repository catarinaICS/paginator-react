import { nanoid } from "nanoid";
import React from "react";
import { Nodes } from "../contexts/PageContext";
import "./dropzone.scss";

type DropzoneProps = {
  showEmptyBox?: boolean;
  componentParents: string[];
  index: number;
  addNode: (idx: number, node: Nodes) => void;
};
const Dropzone: React.FC<DropzoneProps> = ({
  index,
  componentParents,
  showEmptyBox = false,
  addNode,
}) => {
  const handleDragExit = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.currentTarget.style.backgroundColor = "none";
    ev.currentTarget.classList.remove("onDragover");
  };
  const handleDragOver = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "copy";
    ev.currentTarget.classList.add("onDragover");
  };

  const handleDrop = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    ev.currentTarget.classList.remove("onDragover");

    const componentType = ev.dataTransfer.getData("text/plain");
    if (componentType === "container") {
      addNode(index, {
        type: "container",
        id: nanoid(10),
        props: {},
        nodes: [],
        parents: componentParents,
      });
    }

    if (componentType === "text") {
      addNode(index, {
        type: "text",
        id: nanoid(10),
        props: {},
        parents: componentParents,
        content: "Text",
      });
    }
  };

  return (
    <div
      className={`${showEmptyBox ? "dropzoneBox" : "dropzoneLine"}`}
      onDragLeave={handleDragExit}
      onDragExit={handleDragExit}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {showEmptyBox && <span>EMPTY</span>}
    </div>
  );
};

export default Dropzone;
