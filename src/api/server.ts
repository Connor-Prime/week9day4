let accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcwMTg4MjIzNywianRpIjoiMDI1ZGQzYWEtYTNlMS00YThmLTk5NjYtMTA4YzM3MDQ2ZjQ2IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImNfcHJpbWUiLCJuYmYiOjE3MDE4ODIyMzcsImV4cCI6MTcwNDQ3NDIzN30.gEjhbbW5EiNcX6o1uZ0_q3AH761Raedn56ju7LqERCI"
let userId = localStorage.getItem('uuid') //grabbing the uuid from Google Authentication 

export const serverCalls={
    getShop: async () =>{
        const response = await fetch("https://rangers134-shop-cp.onrender.com/api/shop",
        {method:'GET',
        headers:{
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${accessToken}`
        }
        });
    

    if(!response.ok){
        throw new Error('falied to fetch data'), response.status;
    }

    return await response.json();
    },
    getOrder:async()=>{
            const response =await fetch(`https://rangers134-shop-cp.onrender.com/api/order/${userId}`,
            {method:'GET',
            headers:{
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${accessToken}`
            }
        })  
        

        if(!response.ok){
            throw new Error('falied to fetch data'), response.status;
        }

        return await response.json();
            
    },
    createOrder:async(data:any)=>{
        const response=await fetch(`https://rangers134-shop-cp.onrender.com/api/order/create/${userId}`,
        {method:'POST',
        headers:{
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${accessToken}`
        },
        body:JSON.stringify(data)
        })
    
        return await response.json()
    },
    updateData:async(orderId:string,data:any)=>{
        const response = await fetch(`https://rangers134-shop-cp.onrender.com/api/order/update/${orderId}`,
        {
            method:'PUT',
            headers:{
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${accessToken}`
            },
            body:JSON.stringify(data)
        })
        
        return await response.json()
    },
        deleteOrder: async (orderId: string, data: any) => {
            // api call consist of 1-4 things 
            // 1. url (required)
            // 2. method (optional it will default to GET)
            // 3. headers (optional but usually there) authentication type & type of data 
            // 4. body (optional usually only on a POST, PUT and sometimes DELETE)
            const response = await fetch(`https://rangers134-shop-cp.onrender.com/api/order/delete/${orderId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${accessToken}`
                },
                body: JSON.stringify(data)
            });
    
            if (!response.ok) {
                throw new Error('Failed to delete data'), response.status 
            }
    
            return await response.json()
        }
}