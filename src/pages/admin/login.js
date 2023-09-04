import React, { useContext, useEffect, useState } from "react";

import Form from "react-bootstrap/Form";

import Button from "react-bootstrap/Button";
import './main.css'
// import Firebase from '../../../firebase-config';
// import "../../styles/_login-form.css";

import { collection, query, orderBy, onSnapshot, addDoc, doc, setDoc } from "firebase/firestore"
import { db } from "../../firebase-config";
import { login } from "../../commands/firebaseCommand";
import { db_admin } from "../../commands/StorageConstants";
import { UserContext, USER_ADMIN } from "../../context/GlobalContext";
import PageTitle from "../../component/Title";
import { setGlobalUser, setGlobalUserType, validateInput } from "../../storage/store";
import { Alert } from "react-bootstrap";
import { allData } from "./studentsData";
// import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'

export default function AdminLogin() {

    const { setUser, setUserType } = useContext(UserContext)

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const [message, setMessage] = useState('')
    const [messageSuccess, setMessageSuccess] = useState(false)


    function setUpMessage(messageSuccess, message) {
        setMessageSuccess(messageSuccess)
        setMessage(message)

        setTimeout(() => {
            // setMessageSuccess(false)
            setMessage('')
        }, 3000)

    }



    useEffect(() => {



        // console.log(`Texting ${username}: ${validateInput(username)}`)
    }, [username])



    function validateForm() {
        return username.length > 0 && password.length > 0;

    }

    async function handleSubmit(event) {

        event.preventDefault();
        try {


            login(db_admin, username, password).then(e => {
                // console.log(e)
                if (e == false) {
                    // alert('User not found')

                    setUpMessage(false, 'User not found')
                    // setMessage({ success: false, message: 'User not found' })
                } else

                    // JSON.stringify("loginnnn" + e[0])
                    e.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        //      console.log(doc.id, " => ", doc.data());
                        if (doc.data().password == password) {
                            setMessage({ success: true, message: 'Login Success' })
                            setGlobalUser(doc.data())
                            setGlobalUserType(USER_ADMIN)
                            setUser(doc.data())
                            setUserType(USER_ADMIN)

                            // console.log('true');

                        } else {

                            setUpMessage(false, 'Username / Password incorrect')
                            // setMessage({ success: false, message: 'Username / Password incorrect' })
                            // alert('Username / Password incorrect')
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

            <Form
                className="mx-auto col-sm-6 col-md-4 col-lg-4  mt-5 pt-4"
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

                <Form.Group size="lg" controlId="username" className="mt-3">

                    <Form.Label>Username</Form.Label>

                    <Form.Control

                        required



                        autoFocus

                        type="text"

                        value={username}

                        placeholder='Enter your Admin Username'


                        onChange={(e) => setUsername(e.target.value.trim())}

                    />

                </Form.Group>

                <Form.Group size="lg" controlId="password" className="mt-3">

                    <Form.Label>Password</Form.Label>

                    <Form.Control

                        required

                        placeholder='Enter your Admin Password'


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