import { nanoid } from "nanoid";
import React from "react";
import { TextType } from "../types/nodes/Text";

export type ButtonType = {
  type: "button";
  id: string;
  props: {
    color: "default" | "inherit" | "primary" | "secondary";
    size: "large" | "medium" | "small";
    variant: "contained" | "outlined" | "text";
  };
  parents: string[];
};

export type Nodes = ContainerType | ButtonType | TextType;

export type ContainerType = {
  type: "container";
  id: string;
  props: Record<string, any>;
  nodes: Nodes[];
  parents: string[];
};

export type PageStructure = {
  id: string;
  pageProps: Record<string, any>;
  nodes: Nodes[];
};

export type PageContextType = {
  isDraggingComponent: boolean;
  editingComponent: { nodeId: string; nodeParents: string[] } | null;
  pageStructure: PageStructure;
  setDraggingComponent: (x: boolean) => void;
  setEditingComponent: (
    x: { nodeId: string; nodeParents: string[] } | null
  ) => void;
  addNodeToPage: (index: number, node: Nodes) => void;
  addNodeToContainer: (index: number, node: Nodes) => void;
  updateNode: (updatedNode: Nodes) => void;
  getNode: (nodeId: string, parentNodes: string[]) => Nodes | undefined;
};

const defaultValue: PageContextType = {
  isDraggingComponent: false,
  editingComponent: null,
  pageStructure: {
    id: "id",
    pageProps: {},
    nodes: [],
  },
  setDraggingComponent: () => {},
  setEditingComponent: () => {},
  addNodeToPage: () => {},
  addNodeToContainer: () => {},
  updateNode: () => {},
  getNode: () => undefined,
};

export const PageContext = React.createContext<PageContextType>(defaultValue);

const PageContextProvider: React.FC = ({ children }) => {
  const [isDraggingComponent, setDraggingComponent] = React.useState(false);
  const [editingComponent, setEditingComponent] = React.useState<{
    nodeId: string;
    nodeParents: string[];
  } | null>(null);
  const [pageStructure, setPageStructure] = React.useState<PageStructure>({
    id: nanoid(10),
    pageProps: {},
    nodes: [],
  });

  const addNodeToPage = (index: number, node: Nodes) => {
    const newState = {
      ...pageStructure,
      nodes: [
        ...pageStructure.nodes.slice(0, index),
        node,
        ...pageStructure.nodes.slice(index),
      ],
    };
    setPageStructure(newState);
  };

  const addNodeToContainer = (index: number, node: Nodes) => {
    const newState = Object.assign({}, pageStructure);
    let parentNode: PageStructure | ContainerType = newState;

    node.parents.forEach((nodeId) => {
      const node = parentNode.nodes.find(
        (node) => (node.id = nodeId)
      ) as ContainerType;
      if (node) {
        parentNode = node;
      }
    });

    const newNodes = [
      ...parentNode.nodes.slice(0, index),
      node,
      ...parentNode.nodes.slice(index),
    ];

    parentNode.nodes = newNodes;
    setPageStructure(newState);
  };

  const updateNode = (updatedNode: Nodes) => {
    const newState = Object.assign({}, pageStructure);
    let parentNode: PageStructure | ContainerType = newState;

    updatedNode.parents.forEach((nodeId) => {
      const node = parentNode.nodes.find(
        (node) => (node.id = nodeId)
      ) as ContainerType;
      if (node) {
        parentNode = node;
      }
    });

    const indexToUpdate = parentNode.nodes.findIndex(
      (n) => (n.id = updatedNode.id)
    );
    if (indexToUpdate !== -1) {
      const newNodes = [
        ...parentNode.nodes.slice(0, indexToUpdate),
        updatedNode,
        ...parentNode.nodes.slice(indexToUpdate + 1),
      ];

      parentNode.nodes = newNodes;
    }
    setPageStructure(newState);
  };

  const getNode = (nodeId: string, parentNodes: string[]) => {
    let parent: PageStructure | ContainerType = pageStructure;
    parentNodes.forEach((parentId) => {
      const newParent = parent.nodes.find((x) => x.id === parentId);

      if (newParent) parent = newParent as PageStructure | ContainerType;
    });

    return parent.nodes.find((x) => x.id === nodeId);
  };

  const value = {
    isDraggingComponent,
    setDraggingComponent,
    editingComponent,
    setEditingComponent,
    pageStructure,
    addNodeToPage,
    addNodeToContainer,
    updateNode,
    getNode,
  };

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
};

export default PageContextProvider;
