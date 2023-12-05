import * as _React from 'react';
import styled from 'styled-components';
import "../../../static/css/main.css";
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

const NavStyle=styled('div')({
    backgroundColor:"black",
    width:"100%",
    height:"5em",
    paddingLeft:"5%",
    paddingTop:"2%",
    paddingBottom:"1%",
    marginLeft:"0px"
})

export const NavBar = () =>{
    return(
        
        <NavStyle>
            <Typography className="main-header" component={Link} to={"/home"}>
                    Caffenated Co.
            </Typography>
          
        </NavStyle>
    )
}

