import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";

import Button from "react-bootstrap/Button";
// import Firebase from '../../../firebase-config';
// import "../../styles/_login-form.css";

import { collection, query, orderBy, onSnapshot, addDoc, doc, setDoc } from "firebase/firestore"
import { db } from "../../firebase-config";
import SideBar from "./sideNav";
import { exist } from "../../commands/firebaseCommand";
import { db_student } from "../../commands/StorageConstants";
import { Alert } from "react-bootstrap";
import { allData } from "./studentsData";
// import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'

export default function CreateStudent() {

    const [matricNo, setMatricNo] = useState("");

    const [password, setPassword] = useState("");

    const [message, setMessage] = useState('')
    const [messageSuccess, setMessageSuccess] = useState(false)



    function saveAllStudents() {
        // console.log('dataaaaa:' + allData[0].matricNo.split(''))
        // const data = allData[0].matricNo.split('')
        console.log('data size: ' + allData.length)

        allData.forEach((data, index) => {
            // allData
            // if (data.matricNo === 'cpe20181009')
            exist(db_student, data.matricNo).then(res => {
                // console.log(res)
                if (res) {
                    setUpMessage(false, 'Student Already exist')

                    // alert('Candidate already exist')
                    return
                } else {
                    console.log('Saving')
                    const date = new Date()
                    // console.log("id: " +return `${data[3]}${data[4]}${data[5]}-${data[3]}-${id}`)



                    const docRef = //await
                        setDoc(doc(db, db_student, data.matricNo), {
                            // const docRef = await addDoc(collection(db, "students",), {
                            // const user = await setDoc(doc(db, 'student', matricNo), {
                            dateCreated: date.toDateString(),
                            // February 5, 2023 at 2:52:36 AM UTC+1
                            // (timestamp)
                            eligibleToVote: false,
                            // console.log("id: " + )
                            id: data.id !== undefined ? data.id : `${data[3]}${data[4]}${data[5]}${data[6]}-${index}`,
                            // id: data.id,
                            matricNo: data.matricNo.toUpperCase().toUpperCase(),
                            name: data.name,
                            password: data.name.split(' ')[0].toLowerCase(),
                            surname: data.name.split(' ')[0].toLowerCase(),
                            voted: false,
                        })
                    // console.log('doc success with id:' + docRef)
                    // alert('Success')
                    setUpMessage(true, 'Student Profile Created')

                }
            })
        })



        function createId(data_, id) {
            const data = data_.matricNo.split('')
            return `${data[3]}${data[4]}${data[5]}-${data[3]}-${id}`
        }
    }

    useEffect(() => {
        //  saveAllStudents()
    }, [])


    function setUpMessage(messageSuccess, message) {
        setMessageSuccess(messageSuccess)
        setMessage(message)

        setTimeout(() => {
            // setMessageSuccess(false)
            setMessage('')
        }, 3000)

    }

    function validateForm() {
        return matricNo.length == 11 && password.length > 0;



    }

    async function handleSubmit(event) {

        event.preventDefault();
        try {


            exist(db_student, matricNo).then(res => {
                console.log(res)
                if (res) {
                    setUpMessage(false, 'Student Already exist')

                    // alert('Candidate already exist')
                    return
                } else bb()
            })


            const date = new Date()
            // if () {

            // } else {

            async function bb() {

                const docRef = await setDoc(doc(db, db_student, matricNo), {
                    // const docRef = await addDoc(collection(db, "students",), {
                    // const user = await setDoc(doc(db, 'student', matricNo), {
                    dateCreated: date.toDateString(),
                    // February 5, 2023 at 2:52:36 AM UTC+1
                    // (timestamp)
                    eligibleToVote: false,
                    // id: 2,
                    matricNo: matricNo.toUpperCase(),
                    name: '',
                    password: password,
                    voted: false,
                })
                // console.log('doc success with id:' + docRef)
                // alert('Success')
                setUpMessage(true, 'Student Profile Created')



            }
        } catch (e) {
            console.error(e);
        }


        // const q = query(collection(db, 'tasks'), orderBy('created', 'desc'))
        // onSnapshot(q, (querySnapshot) => {
        //     setTasks(querySnapshot.docs.map(doc => ({
        //         id: doc.id,
        //         data: doc.data()
        //     })))
        // })





    }

    return (

        <>
            <SideBar pageName={'create-student'} />
            <div className="Login login container">

                {/* mx-auto col-6 col-md-4 col-sm-4 mt-5 */}

                <Form
                    className="  mx-4
                     col-6 col-md-4 col-sm-4 mt-4"
                    onSubmit={handleSubmit}>
                    <h3
                        className="mb-3"
                    >Create Student</h3>

                    {
                        message !== '' &&
                        <Alert variant={messageSuccess ? 'success' : 'warning'} >{message}</Alert>
                    }

                    <Form.Group size="lg" controlId="matricNo" className="mt-3">

                        <Form.Label>MatricNo</Form.Label>

                        <Form.Control

                            required



                            autoFocus

                            type="text"

                            value={matricNo}
                            placeholder='format: cpe2010xxxx'

                            onChange={(e) => setMatricNo(e.target.value.trim())}

                        />

                    </Form.Group>

                    <Form.Group size="lg" controlId="password" className="mt-3">

                        <Form.Label>Password</Form.Label>

                        <Form.Control

                            required



                            type="password"

                            value={password}

                            placeholder='Enter student surname'

                            onChange={(e) => setPassword(e.target.value.trim())}

                        />

                    </Form.Group>

                    <Button block size="lg" type="submit" disabled={!validateForm()} className="mt-3">

                        Login

                    </Button>

                </Form>

            </div>
        </>

    );

}