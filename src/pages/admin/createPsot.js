
import React, { useState } from "react";
import Form from "react-bootstrap/Form";

import Button from "react-bootstrap/Button";
// import Firebase from '../../../firebase-config';
// import "../../styles/_login-form.css";

import { collection, query, orderBy, onSnapshot, addDoc, doc, setDoc } from "firebase/firestore"
import { db } from "../../firebase-config";
import SideBar from "./sideNav";
import PageTitle from "../../component/Title";
// import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'

export default function CreatePost() {

    const [matricNo, setMatricNo] = useState("");

    const [password, setPassword] = useState("");



    function validateForm() {
        return matricNo.length > 0 && password.length > 0;



    }

    async function handleSubmit(event) {

        event.preventDefault();
        try {


            const date = new Date()



            const user = await setDoc(doc(db, 'student', matricNo), {
                dateCreated: date.toDateString(),
                // February 5, 2023 at 2:52:36 AM UTC+1
                // (timestamp)
                eligibileToVote: false,
                // id: 2,
                matricNo: matricNo,
                name: '',
                password: password,
                voted: false,
            })

            // const doc = await addDoc(
            //     doc(collection(db, 'election2023'), {
            //         dateCreated: '',
            //         // February 5, 2023 at 2:52:36 AM UTC+1
            //         // (timestamp)
            //         eligibileToVote: false,
            //         id: 2,
            //         matricNo: matricNo,
            //         name: '',
            //         password: password,
            //         voted: false,
            //     }))

            console.log('doc success with id:' + user)


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
            <PageTitle tile={'Admin - create Office'} />

            <SideBar pageName={'create-post'} />

            <h4>Create Position</h4>
            {/* <div className="Login login container">



                <Form
                    className="mx-auto col-6 col-md-4 col-sm-4 mt-5"
                    onSubmit={handleSubmit}>
                    <h3
                        className="mb-3"
                    >Create a Position</h3>

                    <Form.Group size="lg" controlId="matricNo" className="mt-3">

                        <Form.Label>MatricNo</Form.Label>

                        <Form.Control
                        
                            required
                        
                        

                            autoFocus

                            type="text"

                            value={matricNo}

                            onChange={(e) => setMatricNo(e.target.value.trim())}

                        />

                    </Form.Group>

                    <Form.Group size="lg" controlId="password" className="mt-3">

                        <Form.Label>Password</Form.Label>

                        <Form.Control
                        
                            required
                        
                        

                            type="password"

                            value={password}

                            onChange={(e) => setPassword(e.target.value.trim())}

                        />

                    </Form.Group>

                    <Button block size="lg" type="submit" disabled={!validateForm()} className="mt-3">

                        Login

                    </Button>

                </Form>

            </div> */}
        </>
    );

}