import React, { useContext, useEffect } from 'react'
import Button from 'react-bootstrap/esm/Button'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../../context/GlobalContext'
import { resetGlobalUser } from '../../storage/store'
import SideBar from './sideNav'

function AdminLogout() {
    const { resetData } = useContext(UserContext)


    useEffect(() => {
        setTimeout(cancel
            , 5000)
    }, [])


    function cancel() {
        return <Navigate to={'admin2023/'} />
    }

    function logout() {
        resetData()
        resetGlobalUser()
    }


    return (
        <>
            <SideBar pageName={'logout'} />
            <>
                <div className='container'>
                    {/* <div className='mt-5 mx-auto'> */}


                    <h4>Are you sure you want to logout</h4>
                    <div style={{ flexDirection: 'row' }}>
                        <Button className='btn btn-danger' onClick={logout}>Logout</Button>
                        <Button className='btn btn-light' onClick={cancel}>Cancel</Button>
                        {/* </div> */}
                    </div>
                </div>
            </>
        </>
    )
}

export default AdminLogout