import * as _React from 'react';
import styled from 'styled-components';
import "../../../static/css/main.css";
import { Box } from '@mui/system';

// internal inputs
import { NavBar } from '../sharedComponents/NavBar';


interface Props{
    username:string
}
const ShopMain=styled('div')({
    color:"black",
    paddingLeft:"10%",
    backgroundColor:"white"
})

export const Shop = (props:Props) =>{

    return(
        <Box>
            <NavBar></NavBar>
            <ShopMain>
                <h1>Welcome to your Shop</h1>
            </ShopMain>
        </Box>
  
    )
}
