import * as _React from 'react';
import styled from 'styled-components';
import "../../../static/css/main.css";
import { Link } from 'react-router-dom';
import {Typography,Box} from '@mui/material';
import { NavBar } from '../sharedComponents/NavBar';


const Main=styled('div')({
    color:"white",
    paddingLeft:"20%",
    marginTop:"15%"
})

const Home = () =>{
    const myAuth = localStorage.getItem('auth') // ADD THIS

    if(myAuth==="true"){
        return(<Box>

            <NavBar></NavBar>
    `       <Main>
                 <Typography variant="h3" class ="MainButton" component={Link} to={"/shop"}>
                     View your Products
                 </Typography>
         </Main>
        </Box>)
    }else{
        return(<Box>

            <NavBar></NavBar>
    `       <Main>
                 <Typography variant="h3" class ="MainButton" component={Link} to={"/auth"}>
                     Sign in to view products
                 </Typography>
         </Main>
        </Box>)
    }
}

export {Home}