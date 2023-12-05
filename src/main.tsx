import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import { NavBar } from './components/NavBar/NavBar.tsx'

import { Home } from './components/Home/index.ts'


  ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NavBar></NavBar>
    <Home/>
  </React.StrictMode>,
)

