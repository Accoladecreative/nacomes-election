import React, { useEffect, useState } from 'react';
import { getAllDocument, getDocument } from '../../commands/firebaseCommand';
import { allPositions } from '../../model/localData';
import SideBar from './sideNav';
import './heading.css'
import PageTitle from '../../component/Title';

export default function AllPosition() {
    const [allPosition, setAllPosition] = useState(allPositions)
    const [loading, setLoading] = useState('Loading')

    useEffect(() => {
        const position = allPositions
        // console.log("position:" + position)

        // position.then(res => {
        //     console.log("res:" + JSON.stringify(res.data))
        //     // res.forEach()

        //     res.empty && setLoading('')

        // })
        //     .catch(e => console.error(e))
        // if (!position.empty()) {
        //     setAllPosition(position.docs())
        // }


    }, [])



    return (
        <>
            <>
                <SideBar pageName={'all-post'} />
            </>
            <PageTitle tile={'Admin - All Offices'} />

            <div className='container pt-4 px-4'>
                <h3>All Position</h3>

                {allPosition.length !== 0 ?
                    allPosition.map((student, index) => (
                        <div style={{ marginBottom: 5, }}>
                            <h6 style={{ marginBottom: 0, paddingBottom: 0 }}>
                                {student.name}
                            </h6>
                            <p>
                                {"Level: " + student.level.toString()}
                            </p>
                        </div>
                    ))

                    :
                    <p>Student List Empty</p>
                }
            </div>
        </>
    );
}




// export function 
