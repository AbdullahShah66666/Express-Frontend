import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const MainLayout = () => {
  return (
    <>
      {/* <div>MainLayout</div> */}
      <Navbar />
      <Outlet />
    </>
  )
}

export default MainLayout