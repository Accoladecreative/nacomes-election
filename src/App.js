import { Navigate, Route, Router, Routes, useLocation } from 'react-router-dom'

import Home from './pages/main/home';
import Login from './pages/student/login';
import UpdateAccount from './pages/student/updateAccount';
import Dashboard from './pages/student/dashboard';
import Vote from './pages/student/vote';
import AdminLogin from './pages/admin/login';
import AdminDashboard from './pages/admin/dashboard';
import CreateStudent from './pages/admin/createStudent';
import AllStudents from './pages/admin/allstudents';
import CreateCandidate from './pages/admin/createCandidate';
import PageNotFound from './pages/others/PageNotFound';
import { useContext, useEffect, useState } from 'react';
import { UserContext, USER_ADMIN, USER_STUDENT } from './context/GlobalContext';
import CreatePost from './pages/admin/createPsot';
import AllPosition from './pages/admin/allPositions';
import AllCandidates from './pages/others/allCandidates';
import AdminLogout from './pages/admin/adminLogout';
import StudentLogin from './pages/student/login';
import { GlobalUser, GlobalUserType, } from './storage/store';
import ElectionIsOver from './pages/student/electionIsOver';

{/* <Route path='/student/' element={<Dashboard />} />
<Route path='/student/updateAccount' element={<UpdateAccount />} />
<Route path='/student/dashboard' element={<Dashboard />} />
<Route path='/student/vote' element={<Vote />} /> */}

{/* <Route path='' element={<Dashboard />} /> */ }
//  <Route path='updateAccount' element={<UpdateAccount />} />
//  <Route path='dashboard' element={<Dashboard />} />
//  <Route path='vote' element={<Vote />} />




function authenticateUser() {

}

function App() {
  const { user, userType, voted } = useContext(UserContext)

  // const [user, setUser] = useState(GlobalUser)
  // const [userType, setUserType] = useState(GlobalUserType)

  // useEffect(() => {

  //   setUser(GlobalUser)

  // }, [GlobalUser])

  // useEffect(() => {

  //   setUserType(GlobalUserType)

  // }, [GlobalUserType])
  const isElectionIsOver = false

  const isUserLogin = user !== null;
  // const isStudent = true;
  const isStudent = userType == USER_STUDENT && isUserLogin && !voted;
  const isAdmin = userType == USER_ADMIN && isUserLogin;
  // const isAdmin = true//userType == USER_ADMIN;

  return (
    <Routes>
      {/* <Route path='/' element={<Home />} /> */}
      {/* <Route path='/' element={<Route path='/' element={<Home />} />} /> */}

      {/* students */}
      {/*       THERE IS A SEPARATE FILE FOR AUTH     */}

      <Route path='/' element={isElectionIsOver ? <Navigate to={'/electionIsOver'} /> : (isStudent ? <Dashboard /> : <Navigate to={'/login'} />)} />
      <Route path='/login' element={isElectionIsOver ? <Navigate to={'/electionIsOver'} /> : isStudent ? <Navigate to={'/vote'} /> : <StudentLogin />} />
      {/* <Route path='/login' element={isStudent ? <Navigate to={'/'} /> : <StudentLogin />} /> */}
      <Route path='/updateAccount' element={isElectionIsOver ? <Navigate to={'/electionIsOver'} /> : isStudent ? <UpdateAccount /> : <Navigate to={'/login'} />} />
      <Route path='/dashboard' element={isElectionIsOver ? <Navigate to={'/electionIsOver'} /> : isStudent ? <Dashboard /> : <Navigate to={'/login'} />} />
      <Route path='/vote' element={isElectionIsOver ? <Navigate to={'/electionIsOver'} /> : isStudent ? <AllCandidates /> : <Navigate to={'/login'} />} />
      <Route path='/electionIsOver' element={<ElectionIsOver />} />

      {/* <Route path='/student' element={isStudent ? <Dashboard /> : <Navigate to={'/student/login'} />} />
      <Route path='/student/login' element={isStudent ? <Navigate to={'/student'} /> : <StudentLogin />} />
      <Route path='/student/updateAccount' element={isStudent ? <UpdateAccount /> : <Login />} />
      <Route path='/student/dashboard' element={isStudent ? <Dashboard /> : <Login />} />
      <Route path='/student/vote' element={isStudent ? <Vote /> : <Login />} /> */}
      {/* </Route> */}
      {/* </Route> */}





      <Route path='/admin2023/' element={isAdmin ? <AllStudents /> : <Navigate to={'/admin2023/login'} />} />
      {/* <Router basename='/admin'> */}
      <Route path='/admin2023/login' element={isAdmin ? <Navigate to={'/admin2023/dashboard'} /> : <AdminLogin />} />
      <Route path='/admin2023/logout' element={isAdmin ? <AdminLogout /> : <Navigate to={'/admin2023/login'} />} />

      <Route path='/admin2023/dashboard' element={isAdmin ? <AllStudents /> : <Navigate to={'/admin2023/login'} />} />
      <Route path='/admin2023/create-student' element={isAdmin ? <CreateStudent /> : <Navigate to={'/admin2023/login'} />} />
      <Route path='/admin2023/create-candidate' element={isAdmin ? <CreateCandidate /> : <Navigate to={'/admin2023/login'} />} />
      {/* <Route path='/admin2023/create-post' element={isAdmin ? <CreateCandidate /> : <Navigate to={'/admin2023/login'} />} /> */}
      <Route path='/admin2023/all-candidates' element={isAdmin ? <AllCandidates /> : <Navigate to={'/admin2023/login'} />} />
      <Route path='/admin2023/all-posts' element={isAdmin ? <AllPosition /> : <Navigate to={'/admin2023/login'} />} />
      <Route path='/admin2023/all-student' element={isAdmin ? <AllStudents /> : <Navigate to={'/admin2023/login'} />} />


      <Route path='*' element={<PageNotFound />} />

    </Routes>

  )
}



function App2() {
  return (
    <Routes>
      <Route path='*' element={<Home />} />


      {/* students */}
      <Route path='/student/login' element={<Login />} />

      <Route path='/student/updateAccount' element={<RequireAuth> <UpdateAccount /> </RequireAuth>} />
      <Route path='/student/dashboard' element={<RequireAuth> <Dashboard /></RequireAuth>} />
      <Route path='/student/vote' element={<RequireAuth><Vote /></RequireAuth>} />




      {/* Admin */}
      <Route path='/admin/login' element={<AdminLogin />} />
      <Route path='/admin/dashboard' element={<AdminDashboard />} />
      <Router basename='/admin'>
        <Route path='/create-student' element={<CreateStudent />} />
        <Route path='/create-candidate' element={<CreateCandidate />} />
        <Route path='/all-student' element={<AllStudents />} />
      </Router>

      <Route path='*' element={<PageNotFound />} />

    </Routes>
  );
}

export default App;



function RequireAuth({ children }) {
  const { user, userType } = useContext(UserContext)
  const authenticateUser = user !== null;
  let location = useLocation();

  if (!authenticateUser) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/student/login" state={{ from: location }} replace />;
  }

  return children;
}