
import React, { useState } from 'react';
import './sidenav.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHome,
    faUsers,
    faUserPlus,
    // faCandidates,
    faUser,
    faUserTie,
    faFlag,
    faSignOutAlt,
    faTimes,
    faBars
} from '@fortawesome/free-solid-svg-icons';
export default function SideBar({ pageName }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
            <nav className={`sidebar ${menuOpen ? 'open' : ''}`}>
                <div className="menu-toggle" onClick={toggleMenu}>
                    {/* <FontAwesomeIcon icon={menuOpen ? 'times' : 'bars'} /> */}
                    <FontAwesomeIcon icon={menuOpen ? faTimes : faBars}
                    />
                </div>
                <ul>
                    <Link to="/admin2023/">
                        <li className={pageName === 'dashboard' ? 'active' : ''}>
                            <FontAwesomeIcon icon={faHome} />
                            <span className={menuOpen ? 'hidden' : ''}>Dashboard</span>                        </li>
                    </Link>
                    <Link to="/admin2023/all-student">
                        <li className={pageName === 'all-students' ? 'active' : ''}>
                            <FontAwesomeIcon icon={faUsers} />
                            <span className={menuOpen ? 'hidden' : ''}>All Students</span>
                        </li>
                    </Link>
                    <Link to="/admin2023/create-student">
                        <li className={pageName === 'create-student' ? 'active' : ''}>
                            <FontAwesomeIcon icon={faUserPlus} />
                            <span>Create Students</span>
                        </li>
                    </Link>
                    <Link to="/admin2023/all-candidates">
                        <li className={pageName === 'all-candidates' ? 'active' : ''}>
                            {/* <FontAwesomeIcon icon={faCandidates} /> */}
                            <FontAwesomeIcon icon={faUser} />
                            <span>All Candidates</span>
                        </li>
                    </Link>
                    <Link to="/admin2023/create-candidate">
                        <li className={pageName === 'create-candidate' ? 'active' : ''}>
                            <FontAwesomeIcon icon={faUserTie} />
                            <span>Create Candidate</span>
                        </li>
                    </Link>
                    <Link to="/admin2023/all-posts">
                        <li className={pageName === 'all-post' ? 'active' : ''}>
                            <FontAwesomeIcon icon={faFlag} />
                            <span>All Positions</span>
                        </li>
                    </Link>
                    <Link to="/admin2023/logout">
                        <li className={pageName === 'logout' ? 'active' : ''}>
                            <FontAwesomeIcon icon={faSignOutAlt} />
                            <span>Logout</span>
                        </li>
                    </Link>
                </ul>
            </nav>




        </>
    );
}
