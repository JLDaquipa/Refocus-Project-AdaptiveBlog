import React from 'react'
import { Outlet } from 'react-router'
import { NavLink, Link } from 'react-router-dom'
import Header from './Header'
import Footer from '../components/Footer'

function Layout() {
  return (
    <div className='site-wrapper'>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout