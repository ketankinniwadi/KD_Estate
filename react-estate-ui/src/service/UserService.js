import axios from "axios";
const User_API_BASE_URL ="http://localhost:8080/real-estate/api/users";
class UserService{

    getUserById(id){
        return axios.get(`${User_API_BASE_URL}/${id}`)
    }
}
export default new UserService()