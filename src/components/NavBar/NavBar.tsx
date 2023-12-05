import * as _React from 'react';
import styled from 'styled-components';
import "../../../static/css/main.css";
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 

const NavStyle=styled('div')({
    backgroundColor:"black",
    width:"100%",
    height:"5em"
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

