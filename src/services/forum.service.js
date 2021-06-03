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
    getPosts(discussion_id, topic_id, page) {
        return API.get(API_URL + "discussions/" + discussion_id + "/" + topic_id + '/posts?page=' + page).then((response) => {
            return response.data;
        });
    }
    ratePost(post_id, type, page) {
        return API.post(API_URL + 'post/like?page=' + page, { post_id: post_id, type: type }).then((response) => {
            return response.data;
        });
    }
    deletePost(post_id, page) {
        return API.post(API_URL + 'post/delete?page=' + page, { post_id: post_id}).then((response) => {
            return response.data;
        });
    }
    sendPost(topic_id, message, page) {
        return API.post(API_URL + 'post?page=' + page, { topic_id: topic_id, message: message}).then((response) => {
            return response.data;
        });
    }
}

export default new ForumService();
