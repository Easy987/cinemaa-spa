import API from "@/api";

const API_URL = process.env.VUE_APP_API_URL + "/forum/";

class ForumService {
    getDiscussions() {
        return API.get(API_URL + "discussions").then((response) => {
            return response.data;
        });
    }
    getTopics(discussion_id) {
        return API.get(API_URL + "discussions/" + discussion_id).then((response) => {
            return response.data;
        });
    }
    getTopic(discussion_id, topic_id) {
        return API.get(API_URL + "discussions/" + discussion_id + "/" + topic_id).then((response) => {
            return response.data;
        });
    }
}

export default new ForumService();
