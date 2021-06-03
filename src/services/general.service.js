import API from "@/api";

const API_URL = process.env.VUE_APP_API_URL + "/general/";

class GeneralService {
    getMessageBoard() {
        return API.get(API_URL + "message_board").then((response) => {
            return response.data;
        });
    }
    sendMessageBoard(message) {
        return API.post(API_URL + "message_board", {message: message}).then((response) => {
            return response.data;
        });
    }
    deleteMessageBoardMessage(id) {
        return API.delete(API_URL + "message_board/" + id).then((response) => {
            return response.data;
        });
    }
    getChat() {
        return API.get(API_URL + "chat").then((response) => {
            return response.data;
        });
    }
    getChatMessages(roomID) {
        return API.get(API_URL + "chat/" + roomID).then((response) => {
            return response.data;
        });
    }
    sendChatMessage(id, data) {
        return API.post(API_URL + "chat", { id: id, data: data }).then((response) => {
            return response.data;
        });
    }
    getUsers() {
        return API.get(API_URL + "chat/users").then((response) => {
            return response.data;
        });
    }
    sendChatMessageReaction(message_id, reaction, remove) {
        return API.post(API_URL + "chat/reaction", { message_id: message_id, reaction: reaction, remove: remove }).then((response) => {
            return response.data;
        });
    }
    createChatGroup(name, users) {
        return API.post(API_URL + "chat/create_group", { name: name, users: users }).then((response) => {
            return response.data;
        });
    }
    updateRoom(room, users) {
        return API.post(API_URL + "chat/update_room", { room: room, users: users }).then((response) => {
            return response.data;
        });
    }
    searchChatUser(username) {
        return API.get(API_URL + "chat/search?username=" + username).then((response) => {
            return response.data;
        });
    }
    kickUserFromGroup(user_id, room_id) {
        return API.delete(API_URL + "chat?user_id=" + user_id + '&room_id=' + room_id).then((response) => {
            return response.data;
        });
    }
    removeRoom(room_id) {
        return API.delete(API_URL + "chat/group?room_id=" + room_id).then((response) => {
            return response.data;
        });
    }
    setMessageSeen(message_id) {
        return API.post(API_URL + "chat/seen", { message_id: message_id }).then((response) => {
            return response.data;
        });
    }
    getUnreadMessagesCount() {
        return API.post(API_URL + "chat/unread").then((response) => {
            return response.data;
        });
    }
    getRequests(page) {
        const params = new URLSearchParams();

        if(page !== null && page !== undefined) {
            params.append('page', page);
        }

        return API.get(API_URL + "requests?" + params.toString()).then((response) => {
            return response.data;
        });
    }
    submitRequest(request) {
        return API.post(API_URL + "requests", {request: request}).then((response) => {
            return response.data;
        });
    }
    deleteRequest(id) {
        return API.delete(API_URL + "requests?id=" + id).then((response) => {
            return response.data;
        });
    }
    getLeaderboard() {
        return API.get(API_URL + "leaderboard").then((response) => {
            return response.data;
        });
    }
}

export default new GeneralService();
