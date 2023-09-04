// import { Button } from 'bootstrap'
import React from 'react'
import { Link } from 'react-router-dom'
import './PageNotFound.css'

export default function PageNotFound() {
    return (
        <div className='container text-center mx-auto my-auto'>
            <h1 className='text-warning oops'>Oops!</h1>
            <h5 className='page-not-found'>404 - page not found</h5>
            <p>The page you are looking for might have been removed or have its name changed or its
                temporarily unavailable</p>
            <Link to={'../'} >
                <input type="button" value="Go back to home page" className="btn-primary btn" /></Link>
        </div>
    )
}
