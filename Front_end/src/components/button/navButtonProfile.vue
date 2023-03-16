<script  setup lang="ts">
    import { useStore } from "vuex"
    import router from '@/router'

    const store = useStore();

    async function click(){
        await router.push('/Profile');
    }

    function getAvatar(){
        const avatar = store.getters.getAvatar;
        if (avatar)
        return avatar;
    }

    function getNickname(){
        const nickname = store.getters.getNickname;
        if (nickname)
        return nickname;
    }
    //voir si il faut une fonction getNickname
</script>

<template>
    <button class="img" @click="click" :style="{ backgroundImage: 'url(' + store.getters.getAvatar + ')' }">
        <img :src="store.getters.getAvatar" />
    </button>
    <div>
        {{ store.getters.getNickname }}
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
</style>