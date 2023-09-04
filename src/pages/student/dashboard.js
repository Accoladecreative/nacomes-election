import React, { useContext, useEffect, useState } from 'react'
import { Navigate, redirect, useNavigation } from 'react-router-dom'
import PageTitle from '../../component/Title'
import { UserContext } from '../../context/GlobalContext'
import { USER_STUDENT } from '../../storage/store'
import { authenticateLogin } from './auth'

export default function Dashboard() {
    const { user, userType } = useContext(UserContext)
    const [message, setMessage] = useState("")
    const [checkPassed, setCheckPassed] = useState(null)

    console.log(user)

    useEffect(() => {
        // if (userType == USER_STUDENT) {
        //     if (user.surname === user.password) {
        //         setMessage('The System will direct you in few mins, Kindly change your password to continue')
        //         setTimeout(() => {
        //             //navigate to
        //             setCheckPassed(false)
        //         }, 4000);
        //     } else {
        //         setMessage('Verifying...')
        //         setTimeout(() => {
        //             //navigate to
        //             setCheckPassed(true)
        //         }, 4000);
        //         //
        //     }
        // }
    }, [])


    return (
        <div>
            <PageTitle tile={'Student Dashboard'} />
            {
                message !== '' && <p>{message}  </p>
            }

            {
                checkPassed !== null && <Navigate to={checkPassed ? '/vote' : '/updateAccount'} />
            }




        </div>
    )
}
