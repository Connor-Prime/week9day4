import * as _React from 'react';
import styled from 'styled-components';
import "../../../static/css/main.css";
import Button from '@mui/material/Button';


const Main=styled('div')({
    color:"white",
    paddingLeft:"20%",
    marginTop:"15%"
})

const Home = () =>{
    return(
       <Main>
            <Button className='btn-color'>
                <h3 className="main-header">View our Products</h3>
            </Button>
        </Main>
    )
}

export {Home}