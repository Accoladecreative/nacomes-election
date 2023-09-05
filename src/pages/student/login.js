import React, { useContext, useEffect, useState } from "react";

import Form from "react-bootstrap/Form";

import Button from "react-bootstrap/Button";
// import Firebase from '../../../firebase-config';
// import "../../styles/_login-form.css";

import { collection, query, orderBy, onSnapshot, addDoc, doc, setDoc } from "firebase/firestore"
import { db } from "../../firebase-config";
import { login } from "../../commands/firebaseCommand";
import { db_admin, db_student } from "../../commands/StorageConstants";
import { UserContext, USER_STUDENT } from "../../context/GlobalContext";
import PageTitle from "../../component/Title";
import { setGlobalUser, setGlobalUserType, validateInput } from "../../storage/store";
import { Alert } from "react-bootstrap";
import { Navigate } from "react-router-dom";
// import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'

export default function StudeentLogin() {

    const { setUser, setUserType } = useContext(UserContext)

    const [matricNo, setMatricNo] = useState("");

    const [password, setPassword] = useState("");

    const [message, setMessage] = useState('')
    const [messageSuccess, setMessageSuccess] = useState(false)

    const [navigator, setNavigator] = useState('')

    function setUpMessage(messageSuccess, message) {
        setMessageSuccess(messageSuccess)
        setMessage(message)

        setTimeout(() => {
            // setMessageSuccess(false)
            setMessage('')
        }, 3000)

    }



    useEffect(() => {



        //   console.log(`Texting ${matricNo}: ${validateInput(matricNo)}`)
    }, [matricNo])



    function validateForm() {
        return matricNo.length > 0 && password.length > 0;

    }

    async function handleSubmit(event) {

        event.preventDefault();
        try {


            login(db_student, matricNo, password).then(e => {
                // console.log(e)
                if (e == false) {
                    // alert('User not found')

                    setUpMessage(false, 'User not found')
                    // setMessage({ success: false, message: 'User not found' })
                } else

                    // JSON.stringify("loginnnn" + e[0])
                    e.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        console.log(doc.id, " => ", doc.data());
                        if (doc.data().password == password) {
                            if (doc.data().voted) {
                                // setMessage({ success: false, message: '' })
                                setUpMessage(false, 'Access denied! You have voted Already')
                                return
                            }
                            // console.log('====================================');
                            // console.log(doc.data().surname == doc.data().password);
                            // console.log('====================================');
                            if (doc.data().surname == doc.data().password) {
                                setMessage({ success: true, message: 'Login Success...' })
                                setNavigator('/updateAccount')
                                // setNavigator('/vote')


                                // setGlobalUser(JSON.stringify(doc.data()))
                                // setGlobalUserType(USER_STUDENT)
                                setUser(doc.data())
                                setUserType(USER_STUDENT)
                            }
                            else {
                                setNavigator('/vote')
                                setMessage({ success: true, message: 'Login Success' })
                                setGlobalUser(JSON.stringify(doc.data()))
                                setGlobalUserType(USER_STUDENT)
                                // const up = {}
                                // Object.assign(up, { fbid: doc.id })
                                // Object.assign(up, doc.data())
                                // setUser(up)
                                setUser(doc.data())
                                setUserType(USER_STUDENT)
                            }
                            // if(doc.data().)

                            // console.log('true');

                        } else {

                            setUpMessage(false, 'MatricNo / Password incorrect')
                            // setMessage({ success: false, message: 'MatricNo / Password incorrect' })
                            // alert('MatricNo / Password incorrect')
                        }
                    })
            }
                // console.log("logging in:" + JSON.stringify(e.))
            )

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

        <div className="Login container" style={{
            float: "none"
        }}>
            <PageTitle tile={' Admin Login'} />


            {navigator !== '' && //navigator == 'vote' &&
                <Navigate to={navigator} />
            }
            <Form
                className="mx-auto col-sm-6 col-md-4 col-lg-4  mt-5 pt-4"
                style={{
                    // backgroundImage(`url:`)
                }}
                onSubmit={handleSubmit}>
                <h3
                    className="mb-3"
                >Login</h3>
                {
                    message !== '' &&
                    <Alert variant={messageSuccess ? 'success' : 'warning'} >{message}</Alert>
                }
                {/* {
                    message.message !== null & message.success &
                    <div className="alert alert-success" role="alert">
                        {message.message}
                    </div>
                }
                {
                    message.message !== null & !message.success &
                    <div className="alert alert-danger" role="alert">
                        {message.message}
                    </div>
                } */}

                <Form.Group size="lg" controlId="matricNo" className="mt-3">

                    <Form.Label>MatricNo</Form.Label>

                    <Form.Control

                        required



                        autoFocus

                        type="text"

                        value={matricNo}

                        placeholder='cpe202xxxx'


                        onChange={(e) => setMatricNo(e.target.value.trim().toUpperCase())}

                    />

                </Form.Group>

                <Form.Group size="lg" controlId="password" className="mt-3">

                    <Form.Label>Password</Form.Label>

                    <Form.Control

                        required

                        placeholder='Your surname in small letter'


                        type="password"

                        value={password}

                        onChange={(e) => setPassword(e.target.value.trim())}

                    />

                </Form.Group>

                <Button block size="lg" type="submit" disabled={!validateForm()} className="mt-3">

                    Login

                </Button>

            </Form>

        </div>

    );

}