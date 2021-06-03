import GeneralService from "@/services/general.service";
import AuthService from "@/services/auth.service";

const general = {
    namespaced: true,
    name: "general",
    state: {
        messageBoard: [],
        users: [],
        requests: [],
        leaderboard: [],
    },
    getters: {
        messageBoard: (state) => {
            return state.messageBoard;
        },
        user: (state) => {
            return state.user.user;
        },
        users: (state) => {
            return state.users;
        },
        requests: (state) => {
            return state.requests;
        },
        leaderboard: (state) => {
            return state.leaderboard;
        },
    },
    actions: {
        getMessageBoard({commit}) {
            return GeneralService.getMessageBoard()
                .then((response) => {
                    commit("setMessageBoard", response.data);
                    return Promise.resolve(response);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },
        addMessageToMessageBoard({commit}, {message}) {
            commit("addMessageToMessageBoard", message);
        },
        sendMessageBoard({commit}, {message}) {
            return GeneralService.sendMessageBoard(message)
                .then((response) => {
                    commit("setMessageBoard", response.data);
                    return Promise.resolve(response);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },
        deleteMessageBoardMessage({commit}, {id}) {
            return GeneralService.deleteMessageBoardMessage(id)
                .then((response) => {
                    commit("setMessageBoard", response.data);
                    return Promise.resolve(response);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },
        getChat({commit}) {
            return GeneralService.getChat()
                .then((response) => {
                    return Promise.resolve(response);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },
        getChatMessages({commit}, {roomID}) {
            return GeneralService.getChatMessages(roomID)
                .then((response) => {
                    return Promise.resolve(response);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },
        searchChatUser({commit}, {username}) {
            return GeneralService.searchChatUser(username)
                .then((response) => {
                    return Promise.resolve(response);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },
        kickUserFromGroup({commit}, {user_id, room_id}) {
            return GeneralService.kickUserFromGroup(user_id, room_id)
                .then((response) => {
                    return Promise.resolve(response);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },
        removeRoom({commit}, {room_id}) {
            return GeneralService.removeRoom(room_id)
                .then((response) => {
                    return Promise.resolve(response);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },
        sendChatMessage({commit}, {id, data}) {
            return GeneralService.sendChatMessage(id, data)
                .then((response) => {
                    return Promise.resolve(response);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },
        sendChatMessageReaction({commit}, {message_id, reaction, remove}) {
            return GeneralService.sendChatMessageReaction(message_id, reaction, remove)
                .then((response) => {
                    return Promise.resolve(response);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },
        getUsers({commit}) {
            return GeneralService.getUsers()
                .then((response) => {
                    commit("setUsers", response.data);
                    return Promise.resolve(response);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },
        createChatGroup({commit}, {name, users}) {
            return GeneralService.createChatGroup(name, users)
                .then((response) => {
                    commit("setUsers", response.data);
                    return Promise.resolve(response);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },
        updateRoom({commit}, {room, users}) {
            return GeneralService.updateRoom(room, users)
                .then((response) => {
                    return Promise.resolve(response);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },
        setMessageSeen({commit}, {message_id}) {
            return GeneralService.setMessageSeen(message_id)
                .then((response) => {
                    return Promise.resolve(response);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },
        getUnreadMessagesCount({commit}) {
            return GeneralService.getUnreadMessagesCount()
                .then((response) => {
                    return Promise.resolve(response);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },
        getRequests({commit}, { page }) {
            return GeneralService.getRequests(page)
                .then((response) => {
                    commit("setRequests", response);
                    return Promise.resolve(response);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },
        submitRequest({commit}, { request }) {
            return GeneralService.submitRequest(request)
                .then((response) => {
                    return Promise.resolve(response);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },
        deleteRequest({commit}, { id }) {
            return GeneralService.deleteRequest(id)
                .then((response) => {
                    return Promise.resolve(response);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },
        getLeaderboard({commit}) {
            return GeneralService.getLeaderboard()
                .then((response) => {
                    commit("setLeaderboard", response);
                    return Promise.resolve(response);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },
    },
    mutations: {
        setMessageBoard(state, messageBoard) {
            state.messageBoard = messageBoard;
        },
        setLeaderboard(state, leaderboard) {
            state.leaderboard = leaderboard;
        },
        addMessageToMessageBoard(state, message) {
            state.messageBoard.unshift(message);
        },
        setUsers(state, users) {
            state.users = users;
        },
        setRequests(state, requests) {
            state.requests = requests;
        }
    },
};

export default general;
