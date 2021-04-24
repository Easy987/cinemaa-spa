import API from "@/api";

const API_URL = process.env.VUE_APP_API_URL + "/contact";

class ContactService {
    sendContact(model) {
        return API.post(API_URL, model)
            .then((response) => {
                return response.data.data;
            });
    }
}

export default new ContactService();
