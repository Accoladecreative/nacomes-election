
import React, { useState } from "react";
import Form from "react-bootstrap/Form";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import Button from "react-bootstrap/Button";
// import Firebase from '../../../firebase-config';
// import "../../styles/_login-form.css";
import './heading.css'

import { collection, query, orderBy, onSnapshot, addDoc, doc, setDoc } from "firebase/firestore"
import { db } from "../../firebase-config";
import SideBar from "./sideNav";
import { allLevels, allPositions } from "../../model/localData";
import { exist } from "../../commands/firebaseCommand";
import { db_candidate } from "../../commands/StorageConstants";
import PageTitle from "../../component/Title";
// import { getAuth, signInWithEmailAndPosition, createUserWithEmailAndPosition } from 'firebase/auth'

export default function CreateCandidate() {


    const [matricNo, setMatricNo] = useState("");

    const [position, setPosition] = useState("");

    const [fullName, setFullName] = useState('')


    const [imageUrl, setImageUrl] = useState('')


    const [level, setLevel] = useState('')
    const [uploading, setUploading] = useState('')



    // progress
    const [percent, setPercent] = useState(0);

    const [file, setFile] = useState("");
    function handleChange(event) {
        setFile(event.target.files[0]);
        console.log(event.target.files)
    }
    const handleUploadImage = () => {
        if (!file) {
            alert("Please upload an image first!");
            return false
        }

        setUploading(true)
        const storageRef = ref(db, `/files/${matricNo}`);

        // progress can be paused and resumed. It also exposes progress updates.
        // Receives the storage reference and the file to upload.
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                // update progress
                setPercent(percent);
            },
            (err) => {
                setUploading(false)
                console.log(err)
            },
            () => {
                setUploading(false)

                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log("url:" + url);
                    setImageUrl(url)
                    return true
                });
            }
        );
    };

    const [submitSuccess, setSubmitSuccess] = useState(false)
    // const [submitSuccess, setSubmitSuccess] = useState(false)


    // const [studentDetails, setStudentDetails] = useState(null);


    // const post

    console.log('detail:' + matricNo + '\n' + position + '\n+' + fullName + '\n+' + level)



    function validateForm() {
        return fullName.length > 0 && matricNo.length == 11 && position.length > 0 //&& file.length > 0;



    }

    async function handleSubmit(event) {

        event.preventDefault();

        try {
            const date = new Date()
            exist(db_candidate, matricNo).then(res => {
                console.log(res)
                if (res) {
                    alert('Candidate already exist')
                    return
                } else bb()
            })
            async function bb() {

                // const docRef = await addDoc(collection(db, db_candidate), {
                const user = await setDoc(doc(db, db_candidate, matricNo), {

                    fullName: fullName,
                    matricNo: matricNo.toUpperCase(),
                    position: position,
                    level: level,
                    imageUrl: imageUrl,
                    vote: 0,
                    dateCreated: date.toDateString(),

                    // // February 5, 2023 at 2:52:36 AM UTC+1
                    // // (timestamp)
                    // eligibileToVote: false,
                    // // id: 2,
                    // matricNo: matricNo,
                    // name: '',
                    // position: position,
                    // voted: false,
                })

                // docRef.id !== undefined &&
                handleSuccess()
                // alert('Success')

                // const doc = await addDoc(
                //     doc(collection(db, 'election2023'), {
                //         dateCreated: '',
                //         // February 5, 2023 at 2:52:36 AM UTC+1
                //         // (timestamp)
                //         eligibileToVote: false,
                //         id: 2,
                //         matricNo: matricNo,
                //         name: '',
                //         position: position,
                //         voted: false,
                //     }))

                // console.log('doc success with id:' + docRef.id)

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


    function handleSuccess() {
        setSubmitSuccess(true)
        setTimeout(() => {
            setSubmitSuccess(false)
        }, 3000);
    }


    return (

        <>
            <PageTitle tile={'Admin - Create Candidate'} />

            <SideBar pageName={'create-candidate'} />

            <div className="Login login container">




                {/* mx-auto */}
                <Form
                    className="
                mx-4
                     col-6 col-md-4 col-sm-4 mt-4"
                    onSubmit={handleSubmit}>
                    <h3
                        className="mb-3"
                    >Create Candidate</h3>
                    {submitSuccess &&
                        <div class="alert alert-success" role="alert">
                            Success
                        </div>
                    }




                    <Form.Group size="lg" controlId="matricNo" className="mt-3">

                        <Form.Label>FullName</Form.Label>



                        <Form.Control

                            required

                            autoFocus

                            type="text"

                            value={fullName}


                            placeholder={'Enter Student name'}

                            onChange={(e) => setFullName(e.target.value.trim())}

                        />

                    </Form.Group>

                    <Form.Group size="lg" controlId="matricNo" className="mt-3">

                        <Form.Label>Student level</Form.Label>


                        <select className="form-control"
                            required
                            onChange={(e) => setLevel(e.target.value.trim())}
                        >
                            <option value={null}>{"Select level"}</option>

                            {allLevels.map((position, index) => (
                                <option value={position.level}>{position.level}</option>
                            ))}
                        </select>
                        {/* <Form.Control
                        
                            required
                        
                        

                            autoFocus

                            type="text"

                            placeholder="300"
                            value={level}

                            onChange={(e) => setLevel(e.target.value.trim())}

                        /> */}

                    </Form.Group>

                    <Form.Group size="lg" controlId="matricNo" className="mt-3">

                        <Form.Label>Position</Form.Label>


                        <select className="form-control"
                            onChange={(e) => setPosition(e.target.value.trim())}
                        >
                            <option value={null}>{"Select Position"}</option>

                            {allPositions.map((position, index) => (
                                <option value={position.name}>{position.name}</option>
                            ))}
                        </select>


                        {/* <Form.Control
                        
                            required
                        
                        

                            autoFocus

                            type="text"

                            value={matricNo}



                            onChange={(e) => setMatricNo(e.target.value.trim())}

                        /> */}

                    </Form.Group>

                    <Form.Group size="lg" controlId="matricNo" className="mt-3">

                        <Form.Label>Student MatricNo</Form.Label>



                        <Form.Control

                            required



                            autoFocus

                            type="text"

                            value={matricNo}

                            placeholder='cpe201xxxxx'


                            onChange={(e) => setMatricNo(e.target.value.trim())}

                        />

                    </Form.Group>


                    {/* <Form.Group size="lg" controlId="matricNo" className="mt-3">

                        <Form.Label>Student Picture</Form.Label>



                        <Form.Control

                            required



                            autoFocus

                            type="file"
                            onChange={(e) => handleChange(e)}
                            accept="/image/*"
                        // value={matricNo}

                        // placeholder='cpe/201x/xxxx'


                        // onChange={(e) => setMatricNo(e.target.value.trim())}

                        /> 

                </Form.Group>*/}

                    {/* {studentDetails !== null&& <div>
                    <p>{studentDetails}</p>
                   </div>} */}




                    <Button block size="lg" type="submit" disabled={!validateForm()} className="mt-3">

                        Create

                    </Button>

                </Form>

            </div>
        </>
    );

}