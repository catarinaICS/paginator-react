import { Editor, Frame, SerializedNode } from "@craftjs/core";
import React, { useEffect, useState } from "react";
import { RouteChildrenProps, RouteProps } from "react-router-dom";
import TextComponent from "./EditableComponents/TextComponent";
//@ts-ignore
const Page: React.FC<RouteChildrenProps<{ id: string }>> = (props) => {
  const [data, setData] = useState<Record<string, SerializedNode> | null>(null);

  useEffect(() => {
    fetch(
      `https://paginatortest-b315.restdb.io/rest/pages/${props.match?.params.id}`,
      {
        method: "GET",
        headers: {
          "cache-control": "no-cache",
          "x-apikey": "5fdf9250ff9d67063814078f",
          "content-type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((json) => {
        setData(json.data);
      });
  }, []);

  if (!data) return null;

  return (
    <div>
      <Editor resolver={{ TextComponent }} enabled={false}>
        <div style={{ width: "100%" }}>
          <Frame data={data} />
        </div>
      </Editor>
    </div>
  );
};

export default Page;
