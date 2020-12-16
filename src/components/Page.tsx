import React, { useContext } from "react";
import { PageContext } from "../contexts/PageContext";
import Dropzone from "./Dropzone";
import RenderNode from "./RenderNode";
import "./styles.scss";

const Page: React.FC = () => {
  const label = "page";
  const { pageStructure, addNodeToPage, isDraggingComponent } = useContext(
    PageContext
  );
  return (
    <div
      className={`container${isDraggingComponent ? " dragging" : ""}${
        pageStructure.nodes.length === 0 ? " empty" : ""
      }`}
    >
      <span className="label">
        {label} {pageStructure.id}
      </span>
      <Dropzone
        showEmptyBox={pageStructure.nodes.length === 0}
        componentParents={[]}
        index={0}
        addNode={addNodeToPage}
      />
      {pageStructure.nodes.map((x, idx) => (
        <React.Fragment key={idx}>
          <RenderNode node={x} />
          <Dropzone
            componentParents={[]}
            index={idx + 1}
            addNode={addNodeToPage}
          />
        </React.Fragment>
      ))}
    </div>
  );
};

export default Page;
