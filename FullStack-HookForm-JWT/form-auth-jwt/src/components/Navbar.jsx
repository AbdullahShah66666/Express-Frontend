import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className=' border-1 border-gray-500 rounded-xl p-1'>
      <ul className='flex gap-2'>
        <li className='text-gray-200 '>
          <Link to="/">Home</Link >
        </li>
        <li>
          <Link to="/register">Register</Link >
        </li>
        <li>
          <Link to="/login">Login</Link >
        </li>
      </ul>
    </nav>
  )
}

export default Navbar