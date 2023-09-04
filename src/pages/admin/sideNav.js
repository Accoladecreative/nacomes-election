import React from 'react';
import { Link } from 'react-router-dom'
import './sidenav.css'

export default function SideBar({ pageName }) {
    return (
        <>

            <nav>
                <ul>

                    <Link to="/admin2023/">
                        <li className={pageName == 'dashboard' ? "active" : ''}>
                            Dashboard
                        </li>
                    </Link>
                    <Link to="/admin2023/all-students">
                        <li className={pageName == 'all-students' ? "active" : ''}>
                            All Students
                        </li>
                    </Link>

                    <Link to="/admin2023/create-student">
                        <li className={pageName == 'create-student' ? "active" : ''}>
                            Create Students
                        </li>
                    </Link>

                    <Link to="/admin2023/all-candidates">
                        <li className={pageName == 'all-candidates' ? "active" : ''}>
                            All Candidates
                        </li>
                    </Link>
                    <Link to="/admin2023/create-candidate">
                        <li className={pageName == 'create-candidate' ? "active" : ''}>
                            Create Candidate
                        </li>
                    </Link>

                    <Link to="/admin2023/all-posts">
                        <li className={pageName == 'all-post' ? "active" : ''}>
                            All Positions
                        </li>
                    </Link>

                    <Link to="/admin2023/logout">
                        <li className={pageName == 'logout' ? "active" : ''}>
                            Logout
                        </li>
                    </Link>








                    {/* <Link to="/admin2023/create-post">
                        <li className={pageName == 'create-post' ? "active" : ''}>
                            Create Post
                        </li>
                    </Link> */}





                    {/* <Link to="cart.html">
                        <li>
                            Cart
                        </li>
                    </Link>


                    <Link to="wishlist.html">
                        <li>wishlist</li>
                    </Link> */}

                </ul>
            </nav>




        </>
    );
}
