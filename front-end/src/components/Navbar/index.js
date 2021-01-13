import React from 'react'
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink
  } from './NavbarElements'
const Navbar = () => {
    return (
        <>
            <Nav>
                <NavLink to="/dashboard">
                    <h1>Travel App</h1>
                </NavLink>
                <Bars />
                <NavMenu>
                    <NavLink to="/dashboard" activeStyle>Dashboard</NavLink>
                    <NavLink to="/profile" activeStyle>Your profile</NavLink>
                    <NavLink to="/addReview" activeStyle>Add review</NavLink>
                    <NavLink to="/seeYourReviews" activeStyle>See your reviews</NavLink>
                    <NavLink to="/search" activeStyle>Search review</NavLink>
                </NavMenu>
                <NavBtn>
                    <NavBtnLink to="/">Log out</NavBtnLink>
                </NavBtn>
            </Nav>
        </>
    )
}

export default Navbar
