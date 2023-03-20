<script setup lang="ts">
    import { useStore } from "vuex"
    import router from '@/router'
    import getAvatar from '../../getAvatar'
    import { onMounted } from 'vue'

    const store = useStore();

    function click(data: any){
        //mettre data dans le store, data = un utilisateur
        store.commit('setOneUser', data);
        console.log('user in oneUserButton',store.getters.getOneUser);
        router.push('/Profile/user');
    }

    async function fetchData(){
        if(store.getters.getWhat == 'all'){
            store.commit('clearArray');
            const user = store.getters.getAllUsers.allUsers;
            const length = user.length;
            for (let index = 0; index < length; index++) {
                await pushAvatarUrl(user[index].user_user_id)
            }
            store.commit('setUsers', store.getters.getAllUsers.allUsers);
        }
        else if(store.getters.getWhat == 'friends'){
            store.commit('clearArray');
            const user = store.getters.getAllUsers.myFriends;
            const length = user.length;
            for (let index = 0; index < length; index++) {
                await pushAvatarUrl(user[index].user_user_id)
            }
            store.commit('setUsers', store.getters.getAllUsers.myFriends);
        }
    }

    async function pushAvatarUrl(userId: any){
        try {
            const url = await getAvatar(store, userId);
            store.commit('setArrayAvatar', { item: url, index: userId});
        } 
        catch (error) {
            console.error(error);
        }
    }

    onMounted(async () => {
        await fetchData();
    });

</script>

<template>
    <div class="avatarButton" v-for="(data ,index) in store.getters.getUsers" :key="index" >
        <button 
            class="img"
            @click="click(data)"
            v-if="store.getters.getArrayAvatar(data.user_user_id)"
            :style="{ 'background-image': 'url(' + store.getters.getArrayAvatar(data.user_user_id) + ')'}"
            >
            <img :src="store.getters.getArrayAvatar(data.user_user_id)" />
            {{ data.user_nickname }}
        </button>
    </div>
</template>

<style scoped lang="scss">
.img{
  max-width: 50px;
  height: 50px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
}
img{
  display: none;
}
.avatarButton{
    display: flex;
    flex-direction: column;
    align-items: center;
    max-height: 100%;
}

</style>