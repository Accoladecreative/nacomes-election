import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { GlobalUser, GlobalUserType } from "../storage/store";

export const UserContext = createContext()

export const USER_STUDENT = 'student__'
export const USER_ADMIN = 'admin__'

export default function ContextProvider(props) {


    const [user, setUser] = useState(localStorage.getItem('user'))
    const [userType, setUserType] = useState(USER_STUDENT)
    const [voted, setVoted] = useState(false)
    // const [students, setstudents] = useState(0)


    const [electionStatus, setElectionStatus] = useState(localStorage.getItem('election'))

    function startElection() {
        const nn = localStorage.setItem('election', true)  // work on this  
        setElectionStatus(nn)
    }

    function stopElection() {
        const nn = localStorage.setItem('election', false)   // work on this 
        setElectionStatus(nn)
    }








    useEffect(() => {

        setUser(GlobalUser)

    }, [GlobalUser])

    useEffect(() => {

        setUserType(GlobalUserType)

    }, [GlobalUserType])


    // const user = localStorage.getItem('user')
    // console.log(localStorage.getItem('user'))
    // function setUser(user) {
    //     localStorage.setItem('user', user)
    // }


    function resetData() {
        setUserType(USER_STUDENT)
        // setUser(null)
        localStorage.removeItem('user')
    }

    return (
        <UserContext.Provider
            value={{ user, setUser, userType, setUserType, resetData, voted, setVoted }}
        >
            {props.children}
        </UserContext.Provider>
    )





}