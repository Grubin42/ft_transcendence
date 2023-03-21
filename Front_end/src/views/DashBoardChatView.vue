<script setup lang="ts">
    import formChanCode from "@/components/form/formChanCode.vue"
    import { useStore } from "vuex"
    import { onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import axios from 'axios'
    
    const router = useRouter();
    const store = useStore();
    
    onMounted(() => {
        getDashboard();
    });
    
    const getDashboard = async () => {
        try {
            const headers = {"Authorization": `Bearer ${store.getters.getToken}`};
            const response = await axios.get('/chat/all', {headers});
            store.commit('setChans', response.data);
            store.commit('setChanId', 0);
            console.log('/chat/all', response.data);
        } catch (error: any) {
            console.log(error)
        }
    }
    
    function getChansPublic(){
        const chansPublic = store.getters.getChans;
        if (chansPublic && chansPublic.chanels){
            return chansPublic.chanels;
        }
        else{
            return [];
        }
    }
    
    function getChansJoined(){
        const chansPublicJoined = store.getters.getChans;
        if (chansPublicJoined && chansPublicJoined.chanels){
            return chansPublicJoined.Mychanels;
        }
        else{
            return [];
        }
    }
    
    function getChansPrivate(){
        const chansPrivate = store.getters.getChans;
        if (chansPrivate && chansPrivate.privMsg){
            return chansPrivate.privMsg;
        }
        else{
            return [];
        }
    }
    

    const  clickChan = async (chan: any) =>{
        try {
            const headers = {"Authorization": `Bearer ${store.getters.getToken}`};
            const response = await axios.get(`/chat/join/${chan.chanel_chat_id}`, {headers});
            store.commit('setChanContext', chan);
            store.commit('setUserContext', response.data);
            const UserContext = store.getters.getUserContext;
            if (UserContext.banned){
                alert("YOU ARE BANNED");
                return ;
            }
            if(UserContext.pwd == true){
                store.commit('setChanId', chan.chanel_chat_id);
            }
            else{
                router.push("/chat");
            }
        } catch (error: any) {
            console.log(error)
            
        }
    }
    
    const quitChan = async (chan :any) =>{
        try {            
            const headers = {"Authorization": `Bearer ${store.getters.getToken}`};
            const data = {
                chanelId: chan.chanel_chat_id,
            }
            const response = await axios.post(`/chat/quit`, data, {headers});//faire trycatch
            store.commit('setChans', response.data);
            console.log('/chat/quit', response.data);
            //router.push('/dashBoardChat')
        } catch (error) {
            console.log(error);
        }
    }
    
    function createMsg(){
        router.push('/CreateChan');//a faire
    }
    
    function createPrivMsg(){
        router.push('/Users');//a faire
    }
</script>

<template>
    <div class="main-dashboard">
        <h1 id="H1">CHANNEL</h1>
        <div class="create-msg">
            <button id="plus" @click="createMsg()">
                +
            </button>
        </div>
        <div class="liste-chan-pub" v-for="(chanPublicJoined, index) in getChansJoined()" :key="index">
            <button id="quitchan" @click="clickChan(chanPublicJoined)">
                {{ chanPublicJoined.chanel_name }}
            </button>
            <button id="plus" @click="quitChan(chanPublicJoined)">
                -
            </button>
        </div>
        <h1>other channel</h1>
        <div class="liste-chan-pub" v-for="(chanPublicNotJoined, index) in getChansPublic()" :key="index">
            <button id="quitchan" @click="clickChan(chanPublicNotJoined)">
                {{ chanPublicNotJoined.chanel_name }}
            </button>
            <formChanCode v-if="store.getters.getUserContext.pwd == true && store.getters.getChanId == chanPublicNotJoined.chanel_chat_id" />
        </div>
        <h1>PrivMsg</h1>
        <div class="create-msg">
            <button id="plus" @click="createPrivMsg()">
                +
            </button>
        </div>
        <div class="liste-privMsg" v-for="(chanPrivate, index) in getChansPrivate()" :key="index">
            <button id="quitchan" @click="clickChan(chanPrivate)">
                {{ chanPrivate.users_nickname }}
            </button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.liste-chan-pub{
}
.liste-privMsg{
}

#plus{
    background-color: #007bff;
    margin: 5px;
    border-radius: 9px;
}

#quitchan{
    padding: 4px 8px;
    margin: 5px;
    border-radius: 5px;
    background-color: #0475ee;
    color: #fff;
    border: none;
    cursor: pointer;
    overflow: auto;
}
.main-dashboard{
    display: flex;
    flex-direction: column;
    width: 25rem;
    background-color: rgb(253, 253, 253);
    color: black;
}
</style>