import React, {useState} from "react";
import {connect} from "react-redux";

import Aux from "../../hoc/Auxillary";
import classes from "./Layout.module.css"
import Toolbar from "../Navigation/ToolBar/Toolbar";
import SideDrawer from "../Navigation/NavigationItems/SideDrawer/SideDrawer";
const Layout = props => {
    const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

    const sideDrawerClosedHandler = () => {
      setSideDrawerIsVisible(false);
    };

    const sideDrawerToggleHandler = () => {
        setSideDrawerIsVisible(!sideDrawerIsVisible);
    };


        return(
            <Aux>
                <div>
                    <Toolbar
                        isAuth={props.isAuthenticated}
                        drawerToggleClicked={sideDrawerToggleHandler}/>
                    <SideDrawer
                        isAuth={props.isAuthenticated}
                        open={sideDrawerIsVisible}
                        closed={sideDrawerClosedHandler}/>

                </div>
                <main className={classes.Content}>
                    {props.children}
                </main>
            </Aux>
        );
};

const mapPropsToState = state => {
    return{
        isAuthenticated: state.auth.token !== null
    }
};

export default connect(mapPropsToState)(Layout);
