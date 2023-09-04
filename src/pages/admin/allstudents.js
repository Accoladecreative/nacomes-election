import { faDeleteLeft, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { collection, getDocs, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { getAllDocument, getAllDocument2, getDocument } from '../../commands/firebaseCommand';
import { db_student } from '../../commands/StorageConstants';
import PageTitle from '../../component/Title';
import { db } from '../../firebase-config';
import SideBar from './sideNav';
import { allData } from './studentsData';
import '../style.css'
import { contactDev, GlobalAllStudents, setGlobalAllStudents } from '../../storage/store';
import { Checkbox } from '@mui/material';

export default function AllStudents() {
    const [allStudents, setAllStudents] = useState([])
    // const [allStudents, setAllStudents] = useState(GlobalAllStudents == null ? [] : GlobalAllStudents)
    // useState([{ "matricNo": "20604226AF", "name": "ADEKUNLE AYOMIDE SAMUEL", "surname": "adekunle", "password": "adekunle", "eligibleToVote": false, "voted": false, "id": "", "dateCreated": "Sun Feb 12 2023" }, { "name": "OLUWATUNYI ABIMBOLA JANET", "surname": "oluwatunyi", "dateCreated": "Sun Feb 12 2023", "eligibleToVote": false, "matricNo": "20608077DF", "id": "", "password": "oluwatunyi", "voted": false },])
    const [loading, setLoading] = useState('Loading...')


    const [students, setStudents] = useState([])//useState([{ "matricNo": "20604226AF", "name": "ADEKUNLE AYOMIDE SAMUEL", "surname": "adekunle", "password": "adekunle", "eligibleToVote": false, "voted": false, "id": "", "dateCreated": "Sun Feb 12 2023" }, { "name": "OLUWATUNYI ABIMBOLA JANET", "surname": "oluwatunyi", "dateCreated": "Sun Feb 12 2023", "eligibleToVote": false, "matricNo": "20608077DF", "id": "", "password": "oluwatunyi", "voted": false },])

    const [allVotedStudentsCount, setAllVotedStudentsCount] = useState(0)
    // const localStudents = a

    useEffect(() => {

        students.forEach(st => {
            if (st.voted) {
                setAllVotedStudentsCount(allVotedStudentsCount++)
            }
        })
    }, [allStudents])



    const getAllStudents2 = async () => {

        try {
            const q = query(collection(db, 'students')//, where(collectionName == db_student ? 'matricNo' :
                // 'username', "==", username));
            )

            const querySnapshot = await getDocs(q);
            console.log(querySnapshot);
            if (querySnapshot.empty) {
                console.log('user not found');
                setLoading('Not data found')
                return false
            }
            else {

                querySnapshot.docs.map(doc => allStudents.push(doc.data()))
                // querySnapshot.docs.map(doc => students.push(doc.data()))




                setAllStudents(allStudents)
                // setAllStudents(querySnapshot)
                setLoading('')
                setTimeout(() => {
                    // console.log('allStudents::: ' + JSON.stringify(allStudents))
                    // console.log('allStudents::: ' + JSON.stringify(students))
                    setAllStudents(allStudents)
                    setStudents(students)
                    setGlobalAllStudents(allStudents)

                }, 3000);
            }

        } catch (e) {
            setLoading(e)
        }

    }


    async function getStudents() {
        const students = getAllDocument2('students')
        console.log("students:" + JSON.stringify(students))


        students.then(res => {
            setAllStudents(res)
            setLoading('')
            console.log("ALL STUDENTS:" + JSON.stringify(allStudents))
            // console.log("ALL res:" + JSON.stringify(res))
            allStudents.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                // res.empty && 
                setLoading('')

            })
        })
            .catch(e => console.error(e))
        // if (!students.empty()) {
        //     setAllStudents(students.docs())
        // }


    }
    useEffect(() => {
        // getStudents()
        // students.length == 0 &&
        console.log('GlobalAllStudents:' + GlobalAllStudents)
        getAllStudents2()
    }, [])


    const [name, setName] = useState('');

    const [foundUsers, setFoundUsers] = useState(allStudents);

    const filter = (e) => {
        const keyword = e.target.value;

        if (keyword !== '') {
            const results = allStudents.filter((user) => {
                return user.name.toLowerCase().startsWith(keyword.toLowerCase());
                // Use the toLowerCase() method to make it case-insensitive
            });
            setFoundUsers(results);
        } else {
            setFoundUsers(allStudents);
            // If the text field is empty, show all users
        }

        setName(keyword);
    };
    return (
        <>
            <PageTitle tile={'Admin - All Students'} />

            <SideBar pageName={'dashboard'} />

            <div className='container p-2'>
                <div className='row'>
                    <h3
                        className='col-sm-12 col-md-7 col-lg-7 col-xl-8'
                    >All Students</h3>

                    <div
                        style={{
                            float: 'right'
                        }}
                        className='col-sm-8 col-md-4 col-lg-4 col-xl-3'
                    >
                        <Form.Control
                            type="search"
                            value={name}
                            onChange={filter}
                            className="input"
                            placeholder="Filter"

                        />
                    </div>



                </div>

                {
                    loading !== '' && <h6>{loading}</h6>
                }

                {/* <p>TOTAL VOTES: {allVotedStudentsCount}</p> */}

                {/* <ul> */}
                {/* {foundUsers.length == 0 && students.length > 0 && students.map((car, id) => <div className='row'> */}


                {/* <div> */}



                {/* <div className='col-10'>
                        <p style={{ float: 'left', fontSize: 10, marginTop: 10 }}>{id + 1}</p>
                        <h4 className='mb-0'>
                            {car.name}
                        </h4>

                        <p>
                            {car.matricNo}

                        </p>
                    </div>
                    <div className='col-2'>
                        <FontAwesomeIcon icon={faEdit} color='grey' className='p-2' />
                        <FontAwesomeIcon icon={faTrashAlt} color='red' className='p-2' />
                    </div> */}



                {/* <div className='col-2'> */}

                {/* </div> */}


                {/* </div> */}
                {/* </div>)} */}
                {/* </ul> */}
                {foundUsers && allStudents.length > 0 && (foundUsers.map((car, id) =>
                    <div className='row'>


                        {/* <div> */}
                        <div className='col-10 mb-2'>
                            <p style={{ float: 'left', fontSize: 10, marginTop: 10 }}>{id + 1}</p>
                            <h4 className='mb-0'>
                                {car.name}
                            </h4>

                            <p className='mb-0'>
                                {car.matricNo}

                            </p>
                            <p className='mb-0'>
                                {'Password: ' + car.password}

                            </p>
                            <p>Voted:
                                <Checkbox
                                    size={'small'}
                                    // title={' '}
                                    checked={car.voted !== undefined && car.voted ? true : false} />{car.voted}
                            </p>

                        </div>

                        <div className='col-2'>
                            <FontAwesomeIcon icon={faEdit} color='grey' className='p-2' onClick={contactDev} />
                            <FontAwesomeIcon icon={faTrashAlt} color='red' className='p-2' onClick={contactDev} />
                        </div>
                        {/* <div className='col-2'> */}

                        {/* </div> */}


                        {/* </div> */}
                        {/* <hr className='hr ms-2 me-5' /> */}
                    </div>
                ))}
                {/* : */}

                {/* ) */}
                {/* } */}
            </div>



            {/* <p>Implementing</p> */}
            {/*  &&  */}

            {/* {allData != null
                &&

                <div>
                    {
                        allData.forEach(doc => (<p>`${doc.matricNo}`</p>))
                    }
                </div>
            }




            {
                loading !== '' && <p>{loading}</p>
            }            {allStudents.length !== 0 ?
                allStudents.forEach((student, index) => (
                    <div>
                        <p>Students</p>
                        (student.data().toString())
                    </div>
                ))

                :
                <p>Student List Empty</p>
            } */}

        </>
    );
}




// export function 
