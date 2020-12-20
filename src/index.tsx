import React from "react";
import ReactDOM from "react-dom";
import ReactDOMServer from "react-dom/server";

import { Editor, Frame, Element, useEditor } from "@craftjs/core";

import "./style.scss";
import SideBar from "./components/Sidebar/SideBar";
import { Box, Button, Paper } from "@material-ui/core";
import TextComponent from "components/EditableComponents/TextComponent";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { request } from "http";
import Page from "components/Page";
import PageIndex from "components/PageIndex";

const Toolbar = () => {
  const x = useEditor((state, query) => {
    return {
      serialized: query.getSerializedNodes(),
    };
  });

  const serialized = x.serialized;

  const onClick = () => {
    fetch('https://paginatortest-b315.restdb.io/rest/pages', {
			method: "POST",
			headers: { 
				'cache-control': 'no-cache',
     		'x-apikey': '5fdf9250ff9d67063814078f',
				'content-type': 'application/json',
				
			},
			body: JSON.stringify({ data: serialized })
		})
	};

  return (
    <Box position="fixed" display="flex" right={10} justifyContent="center">
      <Paper>
        <Button onClick={onClick}>Save</Button>
      </Paper>
    </Box>
  );
};

ReactDOM.render(
	<Router>
		<Switch>
			<Route path="/" exact>
				<div>
					<Editor resolver={{ TextComponent }}>
						<Toolbar />
						<SideBar />
						<div style={{ width: "100%" }}>
							<Frame>
								<Element
									canvas
									style={{ border: "1px dashed", padding: "16px" }}
								></Element>
							</Frame>
						</div>
					</Editor>
				</div>
			</Route>
			<Route path="/pages" exact component={PageIndex} />
			<Route path="/:id" component={Page} />
		</Switch>
	</Router>,
  document.getElementById("root")
);
