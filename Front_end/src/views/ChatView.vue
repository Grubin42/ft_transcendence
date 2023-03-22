<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import { useStore } from "vuex"
    import { useRouter } from 'vue-router'
    import axios from 'axios';

    const store = useStore();
    const router = useRouter();
    const chatMessages = ref<string[]>([]);
    const newMessage = ref('');
    let Pwd = '';
    const socket = store.getters.getWebSocket;
    const userContext = store.getters.getUserContext;
    const chanContext = store.getters.getChanContext;

    store.commit("setBool", false)

    onMounted(async () => {
        const headers = { Authorization: `Bearer ${store.getters.getToken}`};
        const response = await axios.get(`/chat/users/${chanContext.chanel_chat_id}`, {headers});
        const chatHistory = await axios.get(`/chat/history/${chanContext.chanel_chat_id}`,  {headers})
        store.commit("setUsersInChan", response.data.users)
        store.commit("setChatHistory", chatHistory.data.history)
        socket.on('join', (message: string) => {
            chatMessages.value.push(message);
        });
        socket.emit('join', `${chanContext.chanel_chat_id}`)
        socket.on('chat', (message: string) => {
            chatMessages.value.push(message);
        });
    });

    const sendMessage = () => {
      if (userContext.muted){
        alert("YOU ARE MUTED")
        return ;
      }
      if (socket){
        socket.emit('chat', newMessage.value, `${chanContext.chanel_chat_id}`);
        newMessage.value = '';
      }
      else{
        store.dispatch('initWebSocket');
      }
    }

  function getUsersInChan(){
      return store.getters.getUsersInChan;
    }

  function clickNickname(user: any){
    store.commit("setOneUser", user)
    router.push('/Profile/user')
  }

  const submmit = async () => {
    if (!userContext.owner){
        alert("YOU ARE NOT A OWNER")
        return ;
    }
    try {
        const headers = { Authorization: `Bearer ${store.getters.getToken}` };
        const data = { chanelId: chanContext.chanel_chat_id, pwd: Pwd};
        const response = await axios.post('/chat/pwd', data,  {headers})
        if(response.status == 201){
          store.commit("setBool", false)
        }
        }catch (error: any) {
          if (error.response.status != 201){
            console.log("Error serveur");
          }
        }
  }

  function getBool(){
      store.commit("setBool", true)
      return store.getters.getBool;
  }

  const deleteChan = async () => {
    try {
        const headers = { Authorization: `Bearer ${store.getters.getToken}` };
        const response = await axios.delete(`/chat/del/${chanContext.chanel_chat_id}`,  {headers})
        router.push('/dashBoardChat')
        }catch (error: any) {
          if (error.response.status != 201){
            console.log("Error serveur");
          }
        }
  }

  function getChatHistory(){
    return store.getters.getChatHistory;
  }

</script>

<template>
  <div>
    <h1> users </h1>
    <div id="capsule" v-for="(user, index) in getUsersInChan()" :key="index">
      <div class="dataUser">
        <div class="nicknameStatus">
          <div class="status-indicator" :class="{ 'status-online': user.user_isActive, 'status-offline': !user.user_isActive }"></div>
          <button id="nickname" @click="clickNickname(user)">
            {{ user.user_nickname }}
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-if="userContext.owner">
    <form @submit.prevent="submmit">
      <button  @click.prevent="getBool">
        changePWD
      </button>
        <div v-if="store.getters.getBool">
          <input type="text" name="code" autocomplete="off"
          placeholder="PWD" minlength="4" maxlength="4" v-model="Pwd">
          <button type="submit">
            submit
          </button>
        </div>
    </form>
    <button @click="deleteChan()">
      deleteChan
    </button>
  </div>
    <h1> {{ chanContext.chanel_name}} </h1>
    <div class="chat-container">
      <div>
        <ul class="chat-messages">
          <li v-for="(chat, index) in getChatHistory().slice().reverse()" :key="index" style="display: flex; flex-direction: column-reverse;">
            {{ chat.sender_nickname }}
            {{ chat.messages_text }}
            {{ chat.messages_createdAt }}
          </li>
        </ul>
      </div>
        <ul class="chat-messages" style="display: flex; flex-direction: column-reverse;">
          <li v-for="(message, index) in chatMessages.slice().reverse()" :key="index" style="display: flex; flex-direction: column-reverse;">
            {{ message }}
          </li>
        </ul>
        <div id="prompt-container">
          <form id="prompt" @submit.prevent="sendMessage">
            <input v-model="newMessage" placeholder="Votre message">
            <button type="submit">Envoyer</button>
          </form>
        </div>
    </div>
</template>

<style scoped lang="scss">

.chat-container {
  position: fixed;
  max-width: 500px;
  margin: 40px;
  bottom: 0;
  width: 50%;
  height: 50%;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  overflow: auto;
}

.chat-messages {
  list-style: none;
  margin: auto;
  padding: 0;
  color: rgb(6, 1, 1);
  display: flex;
  flex-direction: column-reverse;
}

#prompt-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: auto;
  padding: 10px;
  background-color: #fff;
  border-top: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
}

#prompt input{
  flex: 1;
  margin-right: 10px;
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

#prompt button {
  padding: 5px 10px;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  overflow: auto;
}
</style>