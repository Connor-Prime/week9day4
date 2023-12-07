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
    }
}