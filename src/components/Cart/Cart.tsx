import { getDatabase, off, onValue, ref, remove, update } from "firebase/database";
import { useEffect, useState } from "react";


import { MessageType } from "..";
import { ShopProps } from "../../customHooks";
import { Box } from "@mui/system";
import { NavBar } from "../sharedComponents";
import {Button,Typography} from "@mui/material";






export const Cart = () => {

        const db = getDatabase();
        const [ open, setOpen ] = useState(false)
        const [ message, setMessage] = useState<string>()
        const [ messageType, setMessageType ] = useState<MessageType>()
        const [ currentCart, setCurrentCart ] = useState<ShopProps[]>()
        const userId = localStorage.getItem('uuid')
        const cartRef = ref(db, `carts/${userId}/`); 
    

        useEffect(()=> {
    
    

            onValue(cartRef, (snapshot) => {
                const data = snapshot.val() //grabbing our cart data from the database

                let cartList = []
    
                if (data){
                    for (let [key, value] of Object.entries(data)){
                        let cartItem = value as ShopProps
                        cartItem['id'] = key
                        cartList.push(cartItem)
                    }
                }
    
                setCurrentCart(cartList as ShopProps[])
            })
    
            return () => {
                off(cartRef)
            }
        })
            // Update Cart
        const updateQuantity = async (id: string, operation: string) => {
    
                 // findIndex method to find the index of a value based on a conditional
        const dataIndex = currentCart?.findIndex((cart) => cart.id === id) //stores the index of the item it finds

            console.log(id)
        // make a new variable for our currentCart 
        const updatedCart = [...currentCart]
        if (operation === 'dec'){
            updatedCart[dataIndex as number].quantity -= 1
        } else {
            updatedCart[dataIndex as number].quantity += 1
        }

        setCurrentCart(updatedCart)
        }
    
        // function to update cart items
        const updateCart = async ( cartItem: ShopProps ) => {
    
            const itemRef = ref(db, `carts/${userId}/${cartItem.id}`)
    
    
            // use the update() from our database to update a specific cart item
            update(itemRef, {
                quantity: cartItem.quantity
            })
            .then(() => {
                setMessage('Successfully Updated Your Cart')
                setMessageType('success')
                setOpen(true)
            })
            .then(() => {
                setTimeout(() => window.location.reload(), 2000)
            })
            .catch((error) => {
                setMessage(error.message)
                setMessageType('error')
                setOpen(true)
            })
        }
    
    
        // function to delete items from our cart
        const deleteItem = async (cartItem: ShopProps ) => {
    
            const itemRef = ref(db, `carts/${userId}/${cartItem.id}`)
    
    
            // use the update() from our database to update a specific cart item
            remove(itemRef)
            .then(() => {
                setMessage('Successfully Deleted Item from Cart')
                setMessageType('success')
                setOpen(true)
            })
            .then(() => {
                setTimeout(() => window.location.reload(), 2000)
            })
            .catch((error) => {
                setMessage(error.message)
                setMessageType('error')
                setOpen(true)
            })
        }
    
    return(
        <Box>
            <NavBar></NavBar>
            <div className='item-area'>
                {
                    currentCart?.map((cart: ShopProps)=>(
                        <Box className='item-card'>

                            <img src={cart.image} className='item-image' />
                            <Typography variant='h5'>{cart.name}</Typography>
                            <Typography variant='h5'>${cart.price}</Typography>

                            <Button
                                    size='medium'
                                    variant="contained"
                                    onClick = {()=>{deleteItem(cart)}}
                                >
                                    Delete Item
                                </Button>
                            
                                <Box>
                                    <Button
                                        size='medium'
                                        variant='contained'
                                        onClick = {()=>{updateQuantity(cart.id,"dec")}}
                                    >
                                        -
                                    </Button>
                                    <Typography>
                                        {cart.quantity}
                                    </Typography>
                                    <Button
                                        size='medium'
                                        variant='contained'
                                        onClick={()=>{updateQuantity(cart.id, 'inc')}}
                                    >
                                        +
                                    </Button>
                                </Box>
  
                        </Box>
                    ))
                }
            </div>
        </Box>
    )    
}