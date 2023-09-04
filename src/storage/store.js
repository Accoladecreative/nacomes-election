



export const USER_STUDENT = 'student__'
export const USER_ADMIN = 'admin__'





export const GlobalUser = () => localStorage.getItem('user')
export const setGlobalUser = (user) => localStorage.setItem('user', JSON.stringify(user))
export const resetGlobalUser = () => { localStorage.removeItem('user'); localStorage.removeItem('userType') }



export const GlobalUserType = () => localStorage.getItem('userType')
export const setGlobalUserType = (userType) => localStorage.setItem('userType', userType)


export const GlobalAllStudents = async () => { return localStorage.getItem('allStudents') }
export const GlobalAllCandidate = () => localStorage.getItem('allCandidates')
export const setGlobalAllStudents = (value) => localStorage.setItem('allStudents', value)
export const setGlobalAllCandidate = (value) => localStorage.setItem('allCandidates', value)



const regEx = /[a-z,0-9]/

export const validateInput = (input) => {

    return regEx.test(input)
}



export const contactDev = () => {
    alert('Contact Developer!')
}
