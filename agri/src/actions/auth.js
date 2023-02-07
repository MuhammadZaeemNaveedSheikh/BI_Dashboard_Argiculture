import axios from 'axios'
import  {useParams} from 'react-router-dom';
// Headers
const config = {
    headers: {
        'Content-Type': 'application/json'
        
    }
}

// Login the user in

export const login = (data, callback) => {
    // Request body
    const body = data

    axios
        .post('http://localhost:5000/users/login', body, config)
        .then(res => {
            
            if (res.status==200) {
                 localStorage.setItem('token', res.data.token)
                 localStorage.setItem('userinfo',JSON.stringify(res.data.user))
                 
            }
            if (typeof callback === "function") {
                
                callback(res)
            }
        })
        .catch(err => console.log(err))
}

//change password accounts
export const change = (data, callback) => {
    // Request body
    const body = data

    axios
        .post('http://localhost:5000/users/change', body, config)
        .then(res => {
            
            if (res.status==200) {
                 localStorage.setItem('token', res.data.token)
            }
            if (typeof callback === "function") {
                callback(res)
            }
        })
        .catch(err => console.log(err))
}
// verify the user in

export const verify = (data, callback) => {
    // Request body
    const body = data

    axios
        .post('http://localhost:5000/users/verify', body, config)
        .then(res => {
            // if (res.status==200) {
            //      localStorage.setItem('token', res.data.token)
            // }
            if (typeof callback === "function") {
                callback(res)
            }
        })
        .catch(err => console.log(err))
}

//reset password
export const reset = (user, callback) => {

    //Request body
    const body = user
    axios
        .post('http://localhost:5000/users/reset', body, config)
        .then(res => {
            // if (res.data.success) {
            //     localStorage.setItem('token', res.date && res.data.token ? res.data.token : "")
            // }

            if (typeof callback == "function") {
                callback(res)
            }
        })
        .catch(err => console.log(err))
}
//new password
export const PasswordChange = (user, callback) => {

    //Request body
    //  const {token} = useParams()

    // const {token}= this.props.params;
    const body = user

    axios
        .post('http://localhost:5000/users/NewPassword', body, config,)
        .then(res => {
            
            // if (res.data.success) {
            //     localStorage.setItem('token', res.date && res.data.token ? res.data.token : "")
            // }
            

            if (typeof callback == "function") {
                callback(res)
            }
        })
        .catch(err => console.log(err))
}

// Register new User

export const register = (user, callback) => {

    //Request body
    const body = user
    axios
        .post('http://localhost:5000/users/register', body,  {headers: { "Content-Type": "multipart/form-data" }})
        .then(res => {
            if (res.data.success) {
                localStorage.setItem('token', res.date && res.data.token ? res.data.token : "")
            }
            
            if (typeof callback == "function") {
                callback(res)
            }
        })
        .catch(err => console.log(err))
}