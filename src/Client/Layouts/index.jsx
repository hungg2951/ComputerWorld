import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/client/footer/Footer'
import HeaderClient from '../../components/client/header/Header'

const LayoutClient = () => {
  return (
    <div>
      <HeaderClient/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default LayoutClient
