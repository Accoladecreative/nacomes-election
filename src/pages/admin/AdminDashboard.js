import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import SideBar from './sideNav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faCheckCircle, faVoteYea } from '@fortawesome/free-solid-svg-icons'; // Import the icons you want to use
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../firebase-config';

const AdminMainDashboard = () => {
    const [allStudents, setAllStudents] = useState([])
    const [totalVoted, setTotalVoted] = useState(0)

    useEffect(() => {
        getAllStudents2()
    }, [])


    const getAllStudents2 = async () => {

        try {
            const q = query(collection(db, 'students')//, where(collectionName == db_student ? 'matricNo' :
                // 'username', "==", username));
            )

            const querySnapshot = await getDocs(q);
            console.log(querySnapshot);
            if (querySnapshot.empty) {
                console.log('user not found');
                // setLoading('Not data found')
                return false
            }
            else {

                querySnapshot.docs.map(doc => allStudents.push(doc.data()))
                // querySnapshot.docs.map(doc => students.push(doc.data()))
                setAllStudents(allStudents)
                // setAllStudents(querySnapshot)
                // setLoading('')
                setTimeout(() => {
                    // console.log('allStudents::: ' + JSON.stringify(allStudents))
                    // console.log('allStudents::: ' + JSON.stringify(students))
                    setAllStudents(allStudents)
                    // setStudents(students)
                    // setGlobalAllStudents(allStudents)

                }, 3000);
            }

        } catch (e) {
            // setLoading(e)
        }

    }

    // count students that cannot vote that is they have voted
    function countIneligibleStudents() {
        // Use the filter method to get students with eligibleToVote set to false
        const ineligibleStudents = allStudents.filter(student => !student.eligibleToVote);
        setTotalVoted(ineligibleStudents)
        // Return the length of the filtered array, which is the count of ineligible students
        return ineligibleStudents.length;
    }

    useEffect(() => {
        countIneligibleStudents()
    }, [allStudents])


    return (
        <>
            <SideBar pageName={'dashboard'} />
            <Container>
                <h1 className="mt-4">2023 Nacomes Election Dashboard</h1>
                <Row className="mt-4">
                    <Col md={4}>
                        <Card>
                            <Card.Body>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <Card.Title>Total Students</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">Number of Students</Card.Subtitle>
                                        <Card.Text>{allStudents.length}</Card.Text>
                                    </div>
                                    <FontAwesomeIcon icon={faUsers} size="3x" color="blue" />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <Card.Body>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <Card.Title>Total Voted Students</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">Number of Voted Students</Card.Subtitle>
                                        <Card.Text>{totalVoted && totalVoted > 0 ? totalVoted : "-"}</Card.Text>
                                    </div>
                                    <FontAwesomeIcon icon={faVoteYea} size="3x" color="green" />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <Card.Body>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <Card.Title>Total Votes</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">Number of Total Votes</Card.Subtitle>
                                        <Card.Text>-</Card.Text>
                                    </div>
                                    <FontAwesomeIcon icon={faVoteYea} size="3x" color="purple" />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col md={4} className='mb-3'>
                        <Button variant="primary" block>View Total Results</Button>
                    </Col>
                    <Col md={4} className='mb-3'>
                        <Button variant="danger" block>Stop Electons</Button>
                    </Col>
                    <Col md={4} className='mb-3'>
                        <Button variant="success" block>Create new election</Button>
                    </Col>
                </Row>
            </Container>

        </>
    );
};

export default AdminMainDashboard;
