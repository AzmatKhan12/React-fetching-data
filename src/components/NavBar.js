import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

const NavBar = props=>{
    return (
      <Fragment>
        <NavLink to="Retrying"> {props.reload}</NavLink>
      </Fragment>
    );

}
export default NavBar;