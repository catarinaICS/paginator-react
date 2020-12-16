import React, { useContext } from "react";
import { ContainerType, PageContext } from "../contexts/PageContext";
import Dropzone from "./Dropzone";
import RenderNode from "./RenderNode";
import "./styles.scss";

const Container: React.FC<ContainerType> = ({ parents, id, nodes }) => {
  const label = "container";
  const { addNodeToContainer, isDraggingComponent } = useContext(PageContext);

  return (
    <div
      className={`container ${isDraggingComponent ? "dragging" : ""} ${
        nodes.length === 0 ? "empty" : ""
      }`}
    >
      <span className="label">
        {label} {id} (parents: {parents.join(", ")})
      </span>
      <Dropzone
        showEmptyBox={nodes.length === 0}
        componentParents={[...parents, id]}
        index={0}
        addNode={addNodeToContainer}
      />
      {nodes.map(
        (x, idx) =>
          x.type === "container" && (
            <>
              <RenderNode node={x} />
              <Dropzone
                componentParents={[...parents, id]}
                index={idx + 1}
                addNode={addNodeToContainer}
              />
            </>
          )
      )}
    </div>
  );
};

export default Container;
