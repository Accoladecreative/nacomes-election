import React, { useContext } from 'react'
import PageTitle from '../../component/Title'
import { UserContext } from '../../context/GlobalContext'
import { authenticateLogin } from './auth'


export default function Vote() {
    const { user, userType } = useContext(UserContext)

    authenticateLogin(user)


    return (
        <div>
            <PageTitle tile={'Vote'} />

            Vote</div>
    )
}
