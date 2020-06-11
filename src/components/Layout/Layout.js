import React from "react";
import Aux from "../../hoc/Auxillary";
import classes from "./Layout.module.css"
import Toolbar from "../Navigation/ToolBar/Toolbar";
const layout = (props) =>(
    <Aux>
        <div>
          <Toolbar/> side drawer, backdrop

        </div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;
