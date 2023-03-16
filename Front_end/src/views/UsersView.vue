<script setup lang="ts">
    //import capsuleUsers from '@/components/usersComponents/capsuleUsers.vue';
    //import capsuleFriends from '@/components/usersComponents/capsuleFriends.vue';
    //import ButtonFriendsUsers from '@/components/usersComponents/buttonFriendsUsers.vue'
    import axios from 'axios'
    import { useRouter } from 'vue-router'
    import { useStore } from "vuex"
    import { onMounted } from 'vue'

    const router = useRouter();
    const store = useStore();

    function getToken() {
        const token = store.getters.getToken;
        if (token)
        return token;
    }
        
    onMounted(async () => {
        try {
            const headers = { Authorization: `Bearer ${getToken()}` };
            const response = await axios.get("http://c1r2s3:3000/users/all", {headers});
            //store.dispatch('setListProps', {isAllUsers: response.data});
        } catch (error) {
            alert(error);
            /*setTimeout(() => {
                window.location.reload();
            }, 1000);*/
        }
    });

</script>

<template>
    <div id="mainUsers">
        ButtonFriendsUsers 
    </div>
    <div >
    capsuleFriends 
    </div>
    <div>
    capsuleUsers 
    </div>
  </template>

<style scoped lang="scss">
#mainUsers{

}

</style>