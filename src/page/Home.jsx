import React from 'react'
import { NavLink } from 'react-router-dom'

function Home() {
  return (
    <div className='home-page'>
      <div className="logo">
      <img src="public/image/logo.png" alt="logo" />
     </div>
      <div><img src="public/image/home-banner.jfif" alt="" /></div>
      <div><h3>Welcome To Recipe Finder</h3>
      <p>Let's Explore Foods Chemistry</p></div>
      <nav>
          <NavLink to={"/recipes"}>{"Recipes-->"}</NavLink>
      </nav>
    </div>
  )
}

export default Home