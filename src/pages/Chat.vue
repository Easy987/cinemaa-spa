<template>
    <div>
        <Header></Header>
        <PageTitle :title="$t('nav.chat')"></PageTitle>
        <div class="container">
            <b-modal id="messageInfoModal" footer-bg-variant="dark" header-bg-variant="dark" header-text-variant="white" header-border-variant="0" footer-border-variant="0" footer-text-variant="white" body-text-variant="white" body-bg-variant="dark" :title="$t('chat.message_view')">
                <div class="col-12" v-if="selectedMessage && selectedMessage.seenBy && selectedMessage.seenBy.length">
                    <label class="profile__label" for="room_name">{{ $t('chat.seen') }}</label>
                    <div class="row ml-1" v-for="(user, index) in selectedMessage.seenBy" v-bind:key="index">
                        <div class="col-1 text-right pr-2">
                            <img :src="user.avatar" style="width: 30px;" alt="User" class="img-fluid">
                        </div>
                        <div class="col-11 pl-0">
                            <span>{{ user.username}}</span>
                        </div>
                    </div>
                </div>
                <div v-else>
                    {{ $t('chat.no_one_seen') }}
                </div>
            </b-modal>
            <b-modal @ok="updateRoom" id="roomInfoModal" footer-bg-variant="dark" header-bg-variant="dark" header-text-variant="white" header-border-variant="0" footer-border-variant="0" footer-text-variant="white" body-text-variant="white" body-bg-variant="dark" :title="$t('chat.group_view')">
                <div class="col-12">
                    <div class="profile__group">
                        <label class="profile__label" for="room_name">{{ $t('chat.room_name') }}</label>
                        <input id="room_name" :disabled="selectedRoom.user && selectedRoom.user._id !== currentUser.id" required type="text" name="room_name" v-model="selectedRoom.roomName" class="profile__input">
                    </div>
                </div>

                <div class="col-12" v-if="selectedRoom.user && selectedRoom.user._id === currentUser.id">
                    <div class="profile__group">
                        <label class="profile__label" for="room_name">{{ $t('chat.add_user') }}</label>
                        <multiselect
                            v-model="selectedUsers"
                            :options="otherUsers"
                            label="username"
                            track-by="id"
                            :multiple="true"
                            :placeholder="$t('chat.select')"
                            select-label=""
                            deselect-label=""
                            :searchable="true">
                        </multiselect>
                    </div>
                </div>

                <div class="col-12" v-if="selectedRoom.users">
                    <label class="profile__label" for="room_name">{{ $t('chat.members') }}</label>
                    <div class="row ml-1" v-for="(user, index) in selectedRoom.users" v-bind:key="index">
                        <div class="col-1 text-right pr-2">
                            <img :src="user.avatar" style="width: 30px;" alt="User" class="img-fluid">
                        </div>
                        <div class="col-10 pl-0">
                            <span>{{ user.username}}</span>
                        </div>
                        <div class="col-1" v-if="selectedRoom.user && selectedRoom.user._id === currentUser.id">
                            <button v-b-popover.hover.top="''" :title="$t('chat.kick_from_room')" @click="removeUserFromGroup(user._id)"><font-awesome-icon icon="trash-alt" v-b-popover.hover.bottom="''" :title="$t('base.chat_create_room')"></font-awesome-icon></button>
                        </div>
                    </div>
                </div>
            </b-modal>
            <b-modal @ok="addChatModalOk" id="addChatModal" footer-bg-variant="dark" header-bg-variant="dark" header-text-variant="white" header-border-variant="0" footer-border-variant="0" footer-text-variant="white" body-text-variant="white" body-bg-variant="dark" :title="$t('chat.add_room')">
                <div class="col-12">
                    <div class="profile__group">
                        <label class="profile__label" for="room_name">{{ $t('chat.members') }}</label>
                        <multiselect
                            v-model="selectedUsers"
                            :options="otherUsers"
                            label="username"
                            track-by="id"
                            :multiple="true"
                            :placeholder="$t('chat.select')"
                            select-label=""
                            deselect-label=""
                            :searchable="true">
                        </multiselect>
                    </div>
                </div>
                <div class="col-12" v-if="selectedUsers.length > 1">
                    <div class="profile__group">
                        <label class="profile__label" for="room_name">{{ $t('chat.room_name') }}</label>
                        <input id="room_name" required type="text" name="room_name" v-model="roomName" class="profile__input">
                    </div>
                </div>
            </b-modal>
            <chat-window
                theme="dark"
                :current-user-id="this.user().id"
                :rooms="rooms"
                :messages="messages"
                :load-first-room="false"
                :show-add-room="true"
                @fetch-messages="fetchMessages"
                :messagesLoaded="messagesLoaded"
                :roomsLoaded="roomsLoaded"
                :show-files="false"
                :show-audio="false"
                :room-id="selectedRoom.roomId"
                @send-message="sendMessage"
                @searchRoom="test"
                @send-message-reaction="sendReaction"
                @menu-action-handler="menuActionHandler"
                @message-action-handler="messageActionHandler"
                @typing-message="typingMessage"
                @add-room="addRoom"
                ref="chat"
                :text-messages="textMessages"
                :messageActions="[
  {
    name: 'replyMessage',
    title: $t('chat.reply')
  },
  {
    name: 'showSeen',
    title: $t('chat.show_seen')
  }]"
                :menu-actions="menuActions"
            >
                <template #add-icon>
                    <font-awesome-icon icon="plus" v-b-popover.hover.bottom="''" :title="$t('base.chat_create_room')"></font-awesome-icon>
                </template>
            </chat-window>
        </div>

        <Footer></Footer>
    </div>
</template>

<style>
.multiselect__option--highlight, .multiselect__tag ,.multiselect__option--highlight:hover, .multiselect__tag-icon:focus, .multiselect__tag-icon:hover{
    background: #f77f00 !important;
}

.multiselect__tags, .multiselect__input {
    background: rgba(210, 201, 255, 0.04) !important;
    border: 0 !important;
}
</style>

<script>
import Header from "@/components/includes/Header";
import Footer from "@/components/includes/Footer";
import PageTitle from "@/components/PageTitle";
import ChatWindow from 'vue-advanced-chat';
import 'vue-advanced-chat/dist/vue-advanced-chat.css';
import { uuid } from 'vue-uuid';
import {mapGetters} from "vuex";
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css';

export default {
    name: "Chat",
    components: {
        Header,
        Footer,
        ChatWindow,
        PageTitle,
        Multiselect
    },

    computed: {
        ...mapGetters("general", [
            "users",
        ]),
        ...mapGetters("auth", {
            currentUser: 'user',
        }),
        ...mapGetters("auth", [
            "onlineUsers"
        ]),
        menuActions() {
            if(this.selectedRoom && this.selectedRoom.users && this.selectedRoom.users.length > 2) {
                let options = [
                    {
                        name: 'roomInfo',
                        title: this.$i18n.t('chat.show_seen')
                    }
                ];

                if(this.selectedRoom.user._id === this.user().id) {
                    options.push({
                        name: 'removeRoom',
                        title: this.$i18n.t('base.remove_room')
                    })
                }

                return options;
            } else {
                return [];
            }
        },
        textMessages() {
            return {
                ROOMS_EMPTY: this.$i18n.t('chat.rooms_empty'),
                ROOM_EMPTY: this.$i18n.t('chat.room_empty'),
                NEW_MESSAGES: this.$i18n.t('chat.new_messages'),
                MESSAGE_DELETED: this.$i18n.t('chat.message_deleted'),
                MESSAGES_EMPTY: this.$i18n.t('chat.messages_empty'),
                CONVERSATION_STARTED: this.$i18n.t('chat.conversation_started'),
                TYPE_MESSAGE: this.$i18n.t('chat.new_messages'),
                SEARCH: this.$i18n.t('chat.search'),
                IS_ONLINE: this.$i18n.t('chat.is_online'),
                LAST_SEEN: this.$i18n.t('chat.last_seen'),
                IS_TYPING: this.$i18n.t('chat.is_typing')
            };
        },
        otherUsers() {
            let users = this.users.filter(x => x.id !== this.user().id);
            if(this.selectedRoom.users) {
                users = users.filter(x => !this.selectedRoom.users.find(y => y._id === x.id));
            }
            return users;
        }
    },

    data() {
        return {
            rooms: [],
            messages: [],
            messagesLoaded: true,
            roomsLoaded: false,
            savedRooms: [],
            selectedRoom: {},
            selectedUsers: [],
            roomName: "",
            chatOnlineUsers: [],
            searchTimeout: null,
            selectedMessage: {}
        }
    },

    created() {
        this.$root.$emit('unreadReset');

        if(this.users && this.users.length === 0) {
            this.$emit('loadingUpdated', true);
            this.$store.dispatch('general/getUsers').then(() => {
                this.$emit('loadingUpdated', false);
            });
        }

        this.$emit('loadingUpdated', true);
        this.$store.dispatch('auth/getOnlineUsers');
        this.loadRooms();
    },

    watch: {
        'onlineUsers': {
            handler: function() {
                this.updateOnlineStatus();
            },
            immediate: false
        }
    },

    destroyed() {
        window.Echo.leave('Cinema.Chat.' + this.user().id);
    },

    mounted() {
        window.Echo.private('Cinema.Chat.' + this.user().id)
            .listen('.ChatRoomCreated', (e) => {
                this.loadRooms();
            })
            .listen('.ChatMessageSent', (e) => {
                const message = e.message;
                if(message.senderId !== this.user().id) {
                    const roomIndex = this.rooms.findIndex(x => x.roomId === message.roomId);

                    if(roomIndex === -1) {
                        this.loadRooms();
                    } else if(this.selectedRoom.roomId === message.roomId) {
                        this.$store.dispatch('general/setMessageSeen', {message_id: message._id}).then((res) => {

                        });

                        message.seen = 1;
                        this.messages.push(message);

                        let room = this.rooms[roomIndex];
                        room.lastMessage = e.last;
                        room.index = e.last.datetime;
                        this.$set(this.rooms, roomIndex, room);
                    }

                    if(roomIndex !== -1 && this.selectedRoom.roomId !== message.roomId) {
                        let room = this.rooms[roomIndex];
                        room.lastMessage = e.last;
                        room.index = e.last.datetime;
                        room.unreadCount = 1;
                        this.$set(this.rooms, roomIndex, room);
                    }
                }
            })
            .listen('.ChatMessageUpdated', (e) => {
                const message = e.message;

                if(message.roomId === this.selectedRoom.roomId) {
                    const messageIndex = this.messages.findIndex(x => x._id === message._id);
                    this.$set(this.messages, messageIndex, message);
                }
            });
    },

    methods: {
        removeUserFromGroup(user_id) {
            this.$store.dispatch('general/kickUserFromGroup', {user_id: user_id, room_id: this.selectedRoom.roomId}).then((res) => {
                this.$store.dispatch('user/sendToast', {
                        message: this.$t('messages.user_kicked'),
                        type: 'success'
                    }
                );
                this.$bvModal.hide('roomInfoModal');
            });
        },
        messageActionHandler({roomId, action, message}) {
            switch (action.name) {
                case 'showSeen':
                    this.$bvModal.show('messageInfoModal');
                    this.selectedMessage = message;
                    break;
            }
        },

        menuActionHandler({ roomId, action }) {
            switch (action.name) {
                case 'roomInfo':
                    this.$bvModal.show('roomInfoModal');
                    break;
                case 'removeRoom':
                    this.$store.dispatch('general/removeRoom', {room_id: this.selectedRoom.roomId}).then((res) => {
                        this.$store.dispatch('user/sendToast', {
                                message: this.$t('messages.room_removed'),
                                type: 'success'
                            }
                        );
                    });
                    break;
            }
        },
        updateOnlineStatus() {
            this.rooms.forEach((room, roomI) => {
                room.users.forEach((user, userI) => {
                    let onlineUser = this.onlineUsers.filter(x => x.id === user._id);
                    let room = this.rooms[roomI];
                    let roomUser = room.users[userI];

                    if(onlineUser.length > 0) {
                        roomUser.status.state = 'online';
                    } else {
                        roomUser.status.state = 'offline';
                    }
                    this.$set(this.rooms, roomI, room);
                });
            });
        },

        loadRooms() {
            this.$store.dispatch('general/getChat').then((res) => {
                this.rooms = res.data;
                this.roomsLoaded = true;

                let selectedRoom = this.rooms.find(x => x.roomId === this.selectedRoom.roomId);

                if(selectedRoom) {
                    this.selectedRoom = selectedRoom;
                }

                this.updateOnlineStatus();

                if(this.$route.params.username !== undefined){
                    const username = this.$route.params.username;

                    let room = this.rooms.filter(x => x.users.length === 2 && x.users.some(y => y.username === username));

                    if(room.length > 0) {
                        this.selectedRoom = room[0];
                    } else {
                        this.$store.dispatch('general/createChatGroup', {name: username, users: [username]}).then((res) => {
                        });
                    }
                }

                this.$emit('loadingUpdated', false);
            });
        },
        fetchMessages(data, options) {
            if(this.messagesLoaded === true) {
                this.selectedRoom = data.room;
                this.messagesLoaded = false;
                this.$store.dispatch('general/getChatMessages', {roomID: data.room.roomId}).then((res) => {
                    const roomIndex = this.rooms.findIndex(x => x.roomId === data.room.roomId);
                    let room = this.rooms[roomIndex];
                    room.unreadCount = 0;

                    if(room.lastMessage) {
                        room.lastMessage.new = 0;
                        room.lastMessage.seen = 1;
                    }

                    this.$set(this.rooms, roomIndex, room);

                    this.messages = res.data;
                    this.messagesLoaded = true;
                });
            }
        },
        addRoom()
        {
            this.$bvModal.show('addChatModal');
        },
        addChatModalOk(event)
        {
            event.preventDefault();
            if(this.selectedUsers.length > 0 && (this.selectedUsers.length === 1 || this.roomName.length > 0)) {
                this.$store.dispatch('general/createChatGroup', {name: this.roomName, users: this.selectedUsers}).then((res) => {
                    this.$bvModal.hide('addChatModal');
                });

                this.roomName = '';
                this.selectedUsers = [];
            }
        },

        updateRoom(event)
        {
            event.preventDefault();
            if(this.selectedRoom.roomName.length > 0) {
                this.$store.dispatch('general/updateRoom', {room: this.selectedRoom, users: this.selectedUsers}).then((res) => {
                    this.$bvModal.hide('roomInfoModal');
                    this.selectedUsers = [];
                });
            }
        },
        sendMessage(data)
        {
            const messageID = uuid.v4();

            data['room'] = this.selectedRoom;

            let message = {
                'date': this.$moment().format('YYYY-MM-DD H:mm:ss'),
                'content': data.content,
                'saved': 1,
                'senderId': this.user().id,
                'username': this.user().username,
                'replyMessage': data.replyMessage,
                '_id': messageID
            };
            const newGroup = this.messages === undefined;
            if(this.messages === undefined) {
                this.messages = [];
            }

            this.messages.push(message);

            this.$store.dispatch('general/sendChatMessage', {id: messageID, data: data}).then((res) => {
                const roomIndex = this.rooms.findIndex(x => x.roomId === this.selectedRoom.roomId);
                let room = this.rooms[roomIndex];

                if(newGroup)
                {
                    this.$store.dispatch('general/getChat').then((res) => {
                        this.rooms = res.data;
                        this.roomsLoaded = true;
                        this.$emit('loadingUpdated', false);
                    });
                } else {
                    const messageIndex = this.messages.findIndex(x => x._id === messageID);
                    this.$set(this.messages, messageIndex, res.message);
                    room.lastMessage = res.last;
                    room.index = res.last.datetime;
                    this.$set(this.rooms, roomIndex, room)
                }

                this.$emit('loadingUpdated', false);
            }).catch(() => {
                this.messages.pop();
            });
        },

        test({ev, filteredRooms})
        {
            console.log('searching');

            if(this.searchTimeout !== null) {
                window.clearTimeout(this.searchTimeout);
            }

            this.searchTimeout = setTimeout(() => {
                this.searchingUser = true;
                this.savedRooms = this.rooms;
                this.messages = [];

                const username = ev.target.value;
                if(username !== '') {
                    this.$store.dispatch('general/searchChatUser', {username: ev.target.value}).then((res) => {
                        if(res.data.length > 0) {
                            this.rooms = res.data;
                            this.roomsLoaded = true;

                            this.$nextTick(() => {
                                this.messagesLoaded = false;
                                this.$nextTick(() => {
                                    this.messagesLoaded = true;
                                });
                            });
                        }

                        this.$emit('loadingUpdated', false);
                    });
                }
            }, 500);
            if(ev.target.value === '' && this.savedRooms.length !== 0) {
                this.loadRooms();
            }
        },

        sendReaction({roomId, messageId, reaction, remove}) {
            this.$store.dispatch('general/sendChatMessageReaction', {message_id: messageId, reaction: reaction, remove: remove}).then((res) => {
                this.$emit('loadingUpdated', false);
            });
        },

        typingMessage({ message, roomId }) {
            console.log(roomId);
        },
    }
};
</script>
