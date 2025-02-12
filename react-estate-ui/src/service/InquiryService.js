import axios from "axios";
const Inquiry_API_BASE_URL ="http://localhost:8080/real-estate/api/inquiry";
class InquiryService{
    AddInquiry(customerId,propertyId,message){
        return axios.post(Inquiry_API_BASE_URL, {customerId,propertyId,message});
    }

}
export default new InquiryService()