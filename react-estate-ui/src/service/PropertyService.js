import axios from "axios";
const Property_API_BASE_URL ="http://localhost:8080/real-estate/api/properties";
class PropertyService{
    getAllProperty(){
        return axios.get(Property_API_BASE_URL);
    }
    getPropertyById(id){
        return axios.get(`${Property_API_BASE_URL}/${id}`)
    }
    addProperty(propertyData) {
        return axios.post(Property_API_BASE_URL, propertyData);
    }
    deleteProperty(id){
        return axios.delete(`${Property_API_BASE_URL}/${id}`);
    }

}
export default new PropertyService()