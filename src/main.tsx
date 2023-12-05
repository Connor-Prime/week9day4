import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
// import { NavBar } from './components/NavBar/NavBar.tsx'

import { Home } from './components/Home/index.ts'
import { NavBar } from './components/NavBar/NavBar.tsx'
import { Shop } from './components/Shop/index.ts'
import { Route,Routes,BrowserRouter } from 'react-router-dom'


  ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <NavBar/>
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
        </Routes>
      </BrowserRouter> */}

    <Shop/>
    {/* <Home/> */}

  </React.StrictMode>,
)

