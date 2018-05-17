import axios from 'axios'

export default function getLoggedIn() {

    var user;
    axios.get('http://127.0.0.1:8000/rest-auth/user/', { headers: { "Authorization": "Token " + sessionStorage.getItem('userKey') } } )
        .then((data) => {
            
            console.log(data);
            user = data;
        }
    );
    return(user);
}
