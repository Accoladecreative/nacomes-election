import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import PageTitle from '../component/Title';

export default function Home() {
    const navigate = useNavigate()
    useEffect(() => {
        navigate('/student')



    }, [])
    return (

        <>
            <PageTitle tile={'Home'} />

            {/* <Header /> */}
            <h2>Welcome</h2>


        </>
    );
}


//total         students,votes, candidates