import React from 'react'
import { NavLink } from 'react-router-dom'
// import '../style.css]'
export default function Header() {
    return (<nav className="navbar navbar-expand-lg navbar-dark red-bg sticky-top">
        <div className="container-fluid">
            <NavLink className="navbar-brand" to="/notactive">
                {/* <img src={require('../assets/fcl-logo.png')} width="30" height="30" className="d-inline-block align-top" alt="" /> */}
                <span className='text-light m-2'>CPE</span></NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <NavLink className="nav-link text-light " to='/' aria-current="page" >Home</NavLink>
                    </li>
                    <li className="nav-item dropdown">
                        <NavLink className="nav-link text-light dropdown-toggle" to="/about-us" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            About Us
                        </NavLink>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><NavLink className="dropdown-item" to="/">Our Aim</NavLink></li>
                            <li><NavLink className="dropdown-item" to="/">Our goals</NavLink></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><NavLink className="dropdown-item" to="/">Our Ambitions</NavLink></li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/gallery" className="nav-link text-light">Gallery</NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink to="/news" className="nav-link text-light">News</NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink to="/team-members" className="nav-link text-light">Team Members</NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink to="/what-we-do" className="nav-link text-light">What We Do</NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink to="/donations" className="nav-link text-light">Donations</NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink to="/contact-us" className="nav-link text-light">Contact Us</NavLink>
                    </li>
                </ul>
                <form className="d-flex">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-light" type="submit">Search</button>
                </form>
            </div>
        </div>
    </nav>

    )
}

