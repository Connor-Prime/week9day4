import * as _React from 'react';
import { useState, useEffect } from 'react'; 


// internal imports
import { serverCalls } from '../api'; 

export interface ShopProps {
    id: string,
    name: string,
    image: string,
    description: string,
    price: string, 
    prod_id: string,
    quantity: number, 
    order_id?: string
}


interface GetShopDataProps {
    shopData: ShopProps[]
    getData: () => void
}

export const useGetShop = (): GetShopDataProps=>{
    const [shopData, setShopData]=useState<ShopProps[]>([])

    const handleDataFetch = async () =>{
        const result = await serverCalls.getShop()

        setShopData(result)
    }
    // useEffect is essentially an event listener listening for changes to variables 
    // takes 2 arguments, 1 is the function to run, the 2nd is the variable we are watching in a []
    useEffect(()=> {
        handleDataFetch()
    }, []) //[] inside list is variable we are watching/listening to for changes 

    return { shopData, getData: handleDataFetch }

}