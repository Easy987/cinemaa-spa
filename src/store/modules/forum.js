import ForumService from "@/services/forum.service";

const forum = {
    namespaced: true,
    name: "forum",
    state: {
        discussions: [],
        topics: [],
    },
    getters: {
        discussions: (state) => {
            return state.discussions;
        },
        topics: (state) => {
            return state.topics;
        },
    },
    actions: {
        getDiscussions({commit}) {
            return ForumService.getDiscussions()
                .then((response) => {
                    commit("setDiscussions", response.data);
                    return Promise.resolve(response);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },
        getTopics({commit}, {discussion_id: discussion_id}) {
            return ForumService.getTopics(discussion_id)
                .then((response) => {
                    commit("setTopics", response.data);
                    return Promise.resolve(response);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },
        getTopic({commit}, {discussion_id: discussion_id, topic_id: topic_id}) {
            return ForumService.getTopic(discussion_id, topic_id)
                .then((response) => {
                    return Promise.resolve(response);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },
    },
    mutations: {
        setDiscussions(state, discussions) {
            state.discussions = discussions;
        },
        setTopics(state, topics) {
            state.topics = topics;
        },
    },
};

export default forum;
