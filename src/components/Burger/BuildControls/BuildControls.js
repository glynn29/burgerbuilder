import React from "react";
import classes from "./buildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";
const controls = [
    {label:'Salad', type: 'salad'},
    {label:'Cheese', type: 'cheese'},
    {label:'Meat', type: 'meat'},
    {label:'Bacon', type: 'bacon'},
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        {controls.map(control => (
            <BuildControl key={control.label} label={control.label}/>
        ))}
    </div>
);

export default buildControls;
