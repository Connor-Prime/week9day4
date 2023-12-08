import * as _React from 'react';
import styled from 'styled-components';
import "../../../../static/css/main.css";
import { Link } from 'react-router-dom';
import { Typography,Box, Button } from '@mui/material';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

const NavStyle=styled('div')({
    backgroundColor:"peachpuff",
    width:"100%",
    height:"5em",
    paddingLeft:"5%",
    paddingTop:"2%",
    paddingBottom:"1%",
    marginLeft:"0px",
    display:"flex",
    flexDirection:"row",
    justifyContent:'space-between',
    alignItems:'center'
})



export const NavBar = () =>{
    const myAuth = localStorage.getItem('auth') // ADD THIS
    const auth = getAuth(); // ADD THIS
    const navigate= useNavigate()

    const signInButton = async () => {


        if (myAuth === 'false') {
            navigate('/auth')
        } else { 
            await signOut(auth)
            localStorage.setItem('auth', 'false')
            localStorage.setItem('user', '')
            localStorage.setItem('uuid', '')
            navigate('/')
        }
    }


    let signInText="Sign In"

    if(myAuth==="true"){
        signInText="Sign Out"
    }

    return(
        
        <NavStyle>
            <Box>
                <Typography variant='h4' className="main-header" sx={{marginRight:5}} component={Link} to={"/home"}>
                    Caffenated Co.
                </Typography>
                {myAuth ==='true' ? (<Typography variant='h4' className="main-header"  sx={{marginRight:5}} component={Link} to={"/shop"}>Shop</Typography>):(" ")}
                
                {myAuth ==='true' ? (<Typography variant='h4' className="main-header"  component={Link} to={"/cart"}>Cart</Typography>):(" ")}

            </Box>

            <Box sx={{marginRight:"10%"}}>
                <Button variant='contained' onClick={signInButton}>
                    {signInText}
                </Button>
                <Typography >
                    {auth?auth.currentUser?.email:""}
                </Typography>
            </Box>
    
        </NavStyle>
    )
}
