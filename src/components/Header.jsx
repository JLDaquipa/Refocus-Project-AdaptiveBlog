import React from 'react'
import { NavLink, Link } from 'react-router-dom'

function Header() {

  const activeLinkStyle = {
    borderBottom: "1px solid #DCF10D",
    color: "#DCF10D"
  }

  return (
    <>
      <header>
            <Link to="/" className='site-logo'>LOGO</Link>
            <nav className='non-mobile-nav'>
                <NavLink 
                to="blog?show=all" 
                style={({isActive}) => isActive ? activeLinkStyle:null}>
                  Blog
                </NavLink>
                <NavLink 
                to="aboutus" 
                style={({isActive}) => isActive ? activeLinkStyle:null}>
                  About us
                </NavLink>
                <NavLink 
                to="reviews" 
                style={({isActive}) => isActive ? activeLinkStyle:null}>
                  Reviews
                </NavLink>
                <div className='signup-login'>
                    <NavLink to="signup">Sign up</NavLink>
                    <NavLink to="login">Log in</NavLink>
                </div>
            </nav>

            {/* For mobile */}
            <div className='menu-burger'><i className="ri-menu-line"></i></div>
            <div className='nav-menu-burger'>
              <nav className='mobile-nav'>
                  <NavLink to="blog">Blog</NavLink>
                  <NavLink to="aboutus">About us</NavLink>
                  <NavLink to="reviews">Reviews</NavLink>
                  <div className='signup-login'>
                      <NavLink to="signup">Sign up</NavLink>
                      <NavLink to="login">Log in</NavLink>
                  </div>
              </nav>
            </div>
        </header>
    </>
  )
}

export default Header