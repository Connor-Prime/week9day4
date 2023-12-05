import * as _React from 'react';
import styled from 'styled-components';
import "../../../static/css/main.css";
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import {Typography,Box} from '@mui/material';
import { NavBar } from '../NavBar';


const Main=styled('div')({
    color:"white",
    paddingLeft:"20%",
    marginTop:"15%"
})

const Home = () =>{
    return(<Box>

        <NavBar></NavBar>
`       <Main>
         
         <Button className='btn-color'>
             <Typography variant="h3" className="main-header" component={Link} to={"/shop"}>
                 View our Products
             </Typography>
         </Button>
     </Main>
    </Box>
            
       
    )
}

export {Home}