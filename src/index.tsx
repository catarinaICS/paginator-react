import React from "react";
import ReactDOM from "react-dom";
import { Editor, Frame, Element } from "@craftjs/core";

import "./style.scss";
import SideBar from "./components/Sidebar/SideBar";

ReactDOM.render(
	<div>
		<Editor>
			<SideBar />
			<div style={{ width: "100%" }}>
				<Frame>
					<Element canvas style={{ border: '1px dashed', padding: '16px'}}>
					</Element>
				</Frame>
			</div>
		</Editor>
	</div>
, document.getElementById("root"));
