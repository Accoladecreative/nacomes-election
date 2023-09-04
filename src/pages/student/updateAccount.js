import React, { useContext, useState } from 'react'
import PageTitle from '../../component/Title'
import { UserContext } from '../../context/GlobalContext'
import { authenticateLogin } from './auth'

import Form from "react-bootstrap/Form";

import Button from "react-bootstrap/Button";
import { collection, query, orderBy, onSnapshot, addDoc, doc, setDoc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase-config";
import { exist, } from "../../commands/firebaseCommand";
import { db_student } from "../../commands/StorageConstants";
import { Alert } from "react-bootstrap";
import { resetGlobalUser } from '../../storage/store';
// import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'

export default function UpdateAccount() {
    const { user, userType, resetData } = useContext(UserContext)

    // authenticateLogin(user)



    const [matricNo, setMatricNo] = useState("");

    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");

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

    function validateForm() {
        return matricNo.length == 11 && matricNo == user.matricNo && password.length > 5 && cPassword.length > 5 && cPassword === password;



    }

    async function handleSubmit(event) {

        event.preventDefault();
        try {


            exist(db_student, matricNo).then(res => {
                console.log(res)
                if (res) {
                    const docRef = doc(db, db_student, matricNo)

                    // updateDoc(db_student,password,)
                    updateDoc(docRef, { password: password }).then(res => {
                        console.log(JSON.stringify(res))
                        resetGlobalUser()
                        resetData()
                    }).catch(e => {
                        console.log('====================================');
                        console.log(e);
                        console.log('====================================');
                    })

                    // bb

                    // alert('Candidate already exist')
                    return
                } else {
                    setUpMessage(false, 'Record not found')
                }
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


            <PageTitle tile={'Update Account'} />

            <div className="Login login container" style={{ float: 'none' }}>

                {/* mx-auto col-6 col-md-4 col-sm-4 mt-5 */}

                <Form
                    className="  mx-4 mx-auto
                     col-md-6 col-sm-8 col-lg-4 mt-4"
                    onSubmit={handleSubmit}>
                    <h3
                        className="mb-3 mt-3"
                    >Create your Password</h3>

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

                            placeholder='Enter new password'

                            onChange={(e) => setPassword(e.target.value.trim())}

                        />

                    </Form.Group>
                    <Form.Group size="lg" controlId="password" className="mt-3">

                        <Form.Label>Confirm Password</Form.Label>

                        <Form.Control

                            required



                            type="password"

                            value={cPassword}

                            placeholder='Confirm new Password'

                            onChange={(e) => setCPassword(e.target.value.trim())}

                        />

                    </Form.Group>

                    <Button block size="lg" type="submit" disabled={!validateForm()} className="mt-3">

                        UpdateAccount

                    </Button>

                </Form>

            </div>
        </>

    );

}