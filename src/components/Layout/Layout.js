import React from "react";
import Aux from "../../hoc/Auxillary";
import classes from "./Layout.module.css"
import Toolbar from "../Navigation/ToolBar/Toolbar";
import SideDrawer from "../Navigation/NavigationItems/SideDrawer/SideDrawer";
const layout = (props) =>(
    <Aux>
        <div>
          <Toolbar/>
          <SideDrawer/>

        </div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;
