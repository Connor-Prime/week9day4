import * as _React from 'react';
import styled from 'styled-components';
import "../../../static/css/main.css";
// import { useNavigate } from 'react-router-dom';


// const navigate=useNavigate();


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
       <ShopMain>
            <h1>Welcome to your Shop {props["username"]}</h1>
        </ShopMain>
    )
}
