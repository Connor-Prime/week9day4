import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route,Routes,BrowserRouter } from 'react-router-dom'
import {firebaseConfig} from "./firebaseConfig.ts"
import { FirebaseAppProvider } from 'reactfire'

// internal imports
import { Shop } from './components/Shop/index.ts'
import { Home } from './components/Home/Home.tsx'
import { Auth } from './components/index.ts'
import { Cart } from './components/Cart/Cart.tsx'

  ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>

     <BrowserRouter>
      <Routes>
          <Route index element={<Home />} />
          <Route path="/" element={<Home/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/shop" element={<Shop username={"Connor"}/>}/>
          <Route path ="/auth" element={<Auth headerText={"Connor"}/>}/>
          <Route path="/cart" element={<Cart/>}/>
      </Routes>
     </BrowserRouter>
           
    </FirebaseAppProvider>
  </React.StrictMode>,
)

