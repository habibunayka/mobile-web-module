import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='navbar'>
      <Link to={'/'} className="events">Events</Link>
      <Link to={'/settings'} className="settings">Settings</Link>
    </div>
  )
}

export default Navbar