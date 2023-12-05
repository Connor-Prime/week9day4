import * as _React from 'react';
import styled from 'styled-components';
import "../../../static/css/main.css";
import { Link } from 'react-router-dom';
// import {  useNavigate } from "react-router-dom";
// import { Button } from '@mui/material';

// const navigate = useNavigate()
const NavStyle=styled('div')({
    backgroundColor:"black",
    width:"100%",
    height:"5em",
    paddingLeft:"5%",
    paddingTop:"2%",
    paddingBottom:"1%",
    marginLeft:"0px"
})

// const NavHeader = () =>{
//     return(
//         <h1 className="main-header">Caffenated Co.</h1>
//     )
// }

export const NavBar = () =>{
    return(
        <NavStyle>
            <h1 className="main-header">Caffenated Co.</h1>
        </NavStyle>
    )
}

