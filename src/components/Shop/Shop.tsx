import * as _React from 'react';
import styled from 'styled-components';
import "../../../static/css/main.css";
import { Box } from '@mui/system';
// Add these imports
import { useForm, SubmitHandler } from 'react-hook-form';
import { getDatabase, ref, push } from 'firebase/database';
import { MessageType } from '../Auth';
import {useState} from 'react'
import {
    Typography,
    Button,
    Snackbar,
    Alert,
    DialogContent,
    Dialog,
    DialogContentText
}from '@mui/material'

// internal inputs
import { NavBar } from '../sharedComponents/NavBar';
import { useGetShop, ShopProps } from '../../customHooks'; 
import { InputText } from '../sharedComponents';


// interface Props{
//     username:string
// }

export interface SubmitProps{
    quantity:string
}

interface CartProps{
    cartItem:ShopProps
}

const AddToCart = (cart:CartProps) =>{
    const db = getDatabase();
    const [open,setOpen]= useState(false)
    const [message,setMessage]=useState<string>()
    const [messageType, setMessageType]= useState<MessageType>()
    const { register, handleSubmit } = useForm<SubmitProps>({})
    let myCart:ShopProps = cart.cartItem

    const onSubmit:SubmitHandler<SubmitProps>=async(data:SubmitProps, event)=>{
        if(event) 
        event.preventDefault

        const userId = localStorage.getItem('uuid') //grabbing the user id from localstorage 
        const cartRef = ref(db, `carts/${userId}/`) // this is where we are pathing in our database 

        if(myCart.quantity>parseInt(data.quantity)){
            myCart.quantity = parseInt(data.quantity)
        }

        push(cartRef,myCart)
        .then((_newCartRef)=>{
            setMessage(`Successfully added ${data.quantity} ${myCart.name}(s) to Cart.`)
            setMessageType('success')
            setOpen(true)
        }).then(()=>{
            setTimeout(()=>{window.location.reload()},2000)
        }).catch((error)=>{
            setMessage(error.message)
            setMessageType("error")
            setOpen(true)
        })
    }

    return(
        <Box>
        <form onSubmit = {handleSubmit(onSubmit)}>
            <Box>
                <label htmlFor='quantity'>How much of {myCart.name} do you want to add?</label>
                <InputText {...register('quantity')} name='quantity' placeholder='Quantity Here' />
            </Box>
            <Button type='submit'>Submit</Button>
        </form>
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={()=> setOpen(false)}
        >
            <Alert severity = {messageType}>
                {message}
            </Alert>
        </Snackbar>
    </Box>
    )
}










// Rendering

const ShopHeader=styled('div')({
    color:"black",
    paddingLeft:"10%",
    backgroundColor:"white"
})

export const Shop = () =>{

    const {shopData} = useGetShop()
    const [ cartOpen, setCartOpen ] = useState(false); 
    const [ currentShop, setCurrentShop] = useState<ShopProps>();
    console.log(shopData)

    return(
        <Box>
            <NavBar></NavBar>
            <ShopHeader>
                <h1>Welcome to our Shop</h1>
            </ShopHeader>
            <div className='item-area'>
                {
                    shopData.map((product:ShopProps)=>(
                        <Box className='item-card'>

                            <img src={product.image} className='item-image' />
                            <Typography variant='h5'>{product.name}</Typography>
                            <Typography variant='h5'>${product.price}</Typography>

                            <Button
                                    size='medium'
                                    variant="contained"
                                    onClick = {()=>{ setCurrentShop(product) ; setCartOpen(true)}}
                                >
                                    Add to Cart - ${parseFloat(product.price).toFixed(2)}
                                </Button>
                        </Box>
                    ))
                }
            </div>

		<Dialog open={cartOpen} onClose={()=>{setCartOpen(false)}}>
            <DialogContent>
                <DialogContentText>Add to Cart</DialogContentText>
                <AddToCart cartItem = {currentShop as ShopProps}/>
            </DialogContent>
        </Dialog>


        </Box>
  
    )
}
