
import { redirect } from 'react-router-dom';

export function authenticateLogin(user) {
    // const { user, userType } = useContext(UserContext)
    if (user == null) {
        redirect('/login')
        return false

    }
    else

        return true//(<></>)

}