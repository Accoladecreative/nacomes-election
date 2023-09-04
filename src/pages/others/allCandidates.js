import React, { useContext, useEffect, useState } from 'react';
import {
    getAllDocument, getDocument,
    updateRecord,
    voteCandidate
} from '../../commands/firebaseCommand';
import { UserContext, USER_ADMIN } from '../../context/GlobalContext';
import { allPositions } from '../../model/localData';
import SideBar from '../admin/sideNav';
import '../admin/heading.css'
import PageTitle from '../../component/Title';
import { addDoc, collection, doc, getDocs, increment, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../firebase-config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faVoteYea } from '@fortawesome/free-solid-svg-icons';
import { Alert, Button } from 'react-bootstrap';
import { USER_STUDENT } from '../../storage/store';
import { db_student } from '../../commands/StorageConstants';
// import '../admin/main.css'
import bgImg from '../../assets/cpe-logo.jpg'

export default function AllCandidates() {
    const [allCandidates, setAllCandidates] = useState([])
    const [allCandidateIDs, setAllCandidateIDs] = useState([])
    const [loading, setLoading] = useState('Loading')
    const [voteSuccessfully, setVoteSuccessfully] = useState(false)

    const { user, userType, resetData, setUser } = useContext(UserContext)
    // const userAlreadyVoted = userType = USER_STUDENT && JSON.parse(user).voted

    useEffect(() => {
        try {
            const uu = JSON.parse(user).matricNo
            console.log('user:' + uu)
            console.log('user:' + user)

            // userType = USER_STUDENT && user.matricNo !== null && user.matricNo !== undefined &&
            // setFbId(user.matricNo)
            // console.log("USER" + fbId)
        } catch (e) {

            // try {
            //     userType = USER_STUDENT && user.matricNo !== null && user.matricNo !== undefined &&
            //         setFbId(user.matricNo)


            console.warn(e)
        }

    }, [])
    const [fbId, setFbId] = useState('')
    try {
        // console.log("THIS USER" + JSON.stringify(user))
        // console.log("USER" + JSONuser)
        // console.log("THIS USER rr" + userAlreadyVoted)
    } catch (e) {
        console.log("THIS USER" + user)

        // console.info(e)
    }


    const [votePresident, setVotePresident] = useState('')
    const [voteVP, setVoteVP] = useState('')
    const [voteWelfare, setVoteWelfare] = useState('')
    const [voteSocialDir, setVoteSocialDir] = useState('')
    const [voteGenSec, setVoteGenSec] = useState('')
    const [voteAGenSec, setVoteAGenSec] = useState('')
    const [voteFinSec, setVoteFinSec] = useState('')
    const [voteTreasurer, setVoteTreasurer] = useState('')
    const [voteDirectorStudies, setVoteDirectorStudies] = useState('')
    const [voteSport, setVoteSport] = useState('')
    const [votePRO, setVotePRO] = useState('')



    const getAllCandidate = async () => {
        const q = query(collection(db, 'candidate2023')//, where(collectionName == db_student ? 'matricNo' :
            // 'username', "==", username));
        )

        const querySnapshot = await getDocs(q);
        console.log("snap" + querySnapshot);
        if (querySnapshot.empty) {
            console.log('user not found');
            return false
        }
        else {

            const allC = []

            querySnapshot.docs.map(doc => {

                const obj = {}
                Object.assign(obj, doc.data())
                Object.assign(obj, { id: doc.id })
                // allC.push(doc.data())
                allC.push(obj)
            })
            // querySnapshot.docs.map(doc => allC.push(doc.data()))
            // querySnapshot.docs.map(doc => allCandidates.push(doc.data()))




            // setAllCandidates(allCandidates)


            // querySnapshot.forEach((doc) => console.log(doc.id + '   ' + doc.data()))

            // querySnapshot.docs.map(doc => setAllCandidates(allCandidates.push(doc.data())))
            // querySnapshot.docs.map(doc => allCandidates.push(doc.data()))
            // querySnapshot.docs.map(doc => students.push(doc.data()))

            // setAllCandidates(querySnapshot)
            // setAllCandidates(querySnapshot)
            setLoading('')
            setTimeout(() => {
                setAllCandidates(allC)
                console.log('allCandidates3::: ' + JSON.stringify(allC))
                // console.log('allCandidates::: ' + JSON.stringify(allCandidates))
                // setAllCandidates(allCandidates)

            }, 2000);
        }

    }

    useEffect(() => {
        allCandidates.length == 0 && getAllCandidate()
        console.log('type:' + typeof allCandidates)




        loading !== '' && userType == USER_STUDENT &&
            alert('Welcome\nKindly cast your vote for each ' +
                'candidate of your choice and submit at the bottom of the page\n')

    }, [])




    function castVote(position, candidateName) {
        console.log('name: ' + candidateName + '\nposition' + position)
        switch (position) {
            case allPositions[0].name:
                setVotePresident(candidateName)
                break;
            case allPositions[1].name:
                setVoteVP(candidateName)
                break;
            case allPositions[2].name:
                setVoteGenSec(candidateName)
                break;
            case allPositions[3].name:
                setVoteAGenSec(candidateName)
                break;
            case allPositions[4].name:
                setVoteFinSec(candidateName)
                break;
            case allPositions[5].name:
                setVoteTreasurer(candidateName)
                break;
            case allPositions[6].name:
                setVoteWelfare(candidateName)
                break;
            case allPositions[7].name:
                setVoteSocialDir(candidateName)
                break;
            case allPositions[8].name:
                setVoteSport(candidateName)
                break;
            case allPositions[9].name:
                setVoteDirectorStudies(candidateName)
                break;
            case allPositions[10].name:
                setVotePRO(candidateName)
                break;
            default:
                break;
        }
    }

    const voted = (candidateName) =>
        candidateName == votePresident ||
        candidateName == voteVP ||
        candidateName == voteWelfare ||
        candidateName == voteSocialDir ||
        candidateName == voteGenSec ||
        candidateName == voteAGenSec ||
        candidateName == voteFinSec ||
        candidateName == voteTreasurer ||
        candidateName == voteDirectorStudies ||
        candidateName == voteSport ||
        candidateName == votePRO






    function submitVote() {
        console.log(votePresident)
        console.log(voteVP)
        console.log(voteWelfare)
        console.log(voteSocialDir)
        console.log(voteGenSec)
        console.log(voteAGenSec)
        console.log(voteFinSec)
        console.log(voteTreasurer)
        console.log(voteDirectorStudies)
        console.log(voteSport)
        console.log(votePRO)
        if (
            votePresident !== '' &&
            voteVP !== '' &&
            voteWelfare !== '' &&
            voteSocialDir !== '' &&
            voteGenSec !== '' &&
            // voteAGenSec !== '' &&
            // voteFinSec !== '' &&
            // voteTreasurer !== '' &&
            // voteDirectorStudies !== '' &&
            voteSport !== '' &&
            votePRO
        ) {

            voteCandidate(votePresident)
            voteCandidate(voteVP)
            voteCandidate(voteWelfare)
            voteCandidate(voteSocialDir)
            voteCandidate(voteGenSec)
            // voteCandidate(voteAGenSec)
            // voteCandidate(voteFinSec)
            // voteCandidate(voteTreasurer)
            voteCandidate(voteDirectorStudies)
            voteCandidate(voteSport)
            voteCandidate(votePRO)

            setVoteSuccessfully(true)
            // resetData()

            setTimeout(() => {
                // const docRef = doc(db, db_student, user.matricNo)
                // const update = addDoc(docRef, {
                //     voted: true
                // })
                // console.log(update)
                try {
                    const uu = user.matricNo
                    // const uu = JSON.parse(user).matricNo
                    // const uu = JSON.parse(user).matricNo

                    console.log(updateRecord(db_student, uu.toLowerCase(), { voted: true }))
                    localStorage.removeItem('user')
                    setUser(null)

                    // if (typeof user == Object) {


                    // } else {
                    //     const uu = JSON.parse(user).matricNo

                    //     console.log(updateRecord(db_student, uu.toLowerCase(), { voted: true }))
                    //     localStorage.removeItem('user')
                    //     setUser(null)
                    // }

                } catch (e) {
                    console.info(e)
                }
                // console.log('user:' + uu.toLowerCase())
                // console.log('user:' + user)

                // console.log(updateRecord(db_student, uu.toLowerCase(), { voted: true }))
                // localStorage.removeItem('user')
                // setUser(null)

            }, 5000);

        } else {
            alert('Complete Voting before submitting')
        }
    }
    function resetVote() {
        setVotePresident('')
        setVoteVP('')
        setVoteGenSec('')
        setVoteAGenSec('')
        setVoteFinSec('')
        setVoteTreasurer('')
        setVoteWelfare('')
        setVoteSocialDir('')
        setVoteSport('')
        setVoteDirectorStudies('')
        setVotePRO('')

        setVoteSuccessfully(false)
    }
    return (
        // <>he</>
        <>
            <PageTitle tile={'All Candidate'} />

            {userType == USER_ADMIN && <SideBar pageName={'all-candidates'} />}

            <div

                className='container pt-3' style={{

                    // backgroundImage: `url(${bgImg})`,

                    float: userType !== USER_ADMIN && 'none'
                }}>


                {userType == USER_ADMIN ? <h3>All Candidates</h3> :
                    <h3>Choose your Candidates</h3>}
                {
                    loading !== '' && <p>{loading}</p>
                }
                {
                    voteSuccessfully && <Alert
                        variant='success'
                    >Vote Successful</Alert>
                }

                {allPositions.map((position, i) => (
                    <div>
                        {position.name !== '' &&
                            <h2 className='position'>
                                {position.name}
                            </h2>
                        }
                        {allCandidates.length !== 0 ?
                            allCandidates.map((candidate, id) => (
                                candidate.position == position.name &&
                                <>
                                    <div className='row'>

                                        {/* {candidate.imageUrl !== '' &&
                                            <img src={candidate.imageUrl} class="rounded col-2 m-auto" alt="Cinque Terre" />
                                        } */}
                                        {/* <div> */}
                                        <div className={'col-md-10 col-sm-8'}>
                                            {/* <p style={{ float: 'left', fontSize: 10, marginTop: 10 }}>{id + 1}</p> */}
                                            <h4 className='mb-0'>
                                                {candidate.fullName}
                                            </h4>
                                            <p className='mb-0'>
                                                {'Matric No: ' + candidate.matricNo}
                                            </p>
                                            <p className='mb-0'>
                                                {'LEVEL: ' + candidate.level}
                                            </p>
                                            {userType == USER_ADMIN && candidate.vote !== undefined && <p>
                                                {'Votes: ' + candidate.vote}
                                            </p>}

                                        </div>

                                        {userType === USER_ADMIN ?
                                            <div className='col-2'>
                                                <FontAwesomeIcon icon={faEdit} color='grey' className='p-2' />
                                                <FontAwesomeIcon icon={faTrashAlt} color='red' className='p-2' />
                                            </div> :
                                            <div className='col-2'>
                                                <Button
                                                    variant={voted(candidate.id) ?
                                                        'success' :
                                                        'secondary'}


                                                    onClick={() => castVote(position.name, candidate.id)}
                                                >{voted(candidate.id) ?
                                                    'Voted' :
                                                    'Vote'}</Button>
                                            </div>
                                        }

                                    </div>


                                    {/* } */}
                                </>
                            ))

                            :
                            <p>Loading Candidates</p>
                        }


                    </div>
                ))}
                {
                    voteSuccessfully && <Alert
                        variant='success'
                    >Vote Successful</Alert>
                }

                {userType !== USER_ADMIN && <div className='row'>
                    <Button variant='primary' title='' onClick={submitVote} className='col-sm-4 col-md-2 col-lg-2 m-1'>Submit Vote</Button>
                    <Button variant='secondary' title='' onClick={resetVote} className='col-sm-4 col-md-2 col-lg-2 m-1'>Reset Vote</Button>
                </div>}
            </div>
        </>
    );
}






// export function 
