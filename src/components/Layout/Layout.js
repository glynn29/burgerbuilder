import React from "react";
import Aux from "../../hoc/Auxillary";
import classes from "./Layout.module.css"
import Toolbar from "../Navigation/ToolBar/Toolbar";
import SideDrawer from "../Navigation/NavigationItems/SideDrawer/SideDrawer";
class layout extends React.Component{
    state={
        showSideDrawer: false
    };

    sideDrawerClosedHandler = () => {
      this.setState({showSideDrawer: false});
    };

    sideDrawerToggleHandler = () => {

        this.setState((prevState)=>{
        return {showSideDrawer: !prevState.showSideDrawer};
        });
    };

    render() {
        return(
            <Aux>
                <div>
                    <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
                    <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>

                </div>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }


}

export default layout;
