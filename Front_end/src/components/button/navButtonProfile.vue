<script  setup lang="ts">
    import { useStore } from "vuex"
    import router from '@/router'

    const store = useStore();

    async function click(){
        await router.push('/Profile');
    }

    function getAvatar(){
        const self = store.getters.getSelf;
        if (self)
        return self.isAvatar;
    }

    function getNickname(){
        const self = store.getters.getSelf;
        if (self)
        return self.isNickname;
    }
    //voir si il faut une fonction getNickname
</script>

<template>
    <button class="img" @click="click" :style="{ backgroundImage: 'url(' + getAvatar() + ')' }">
        <img :src="getAvatar()" />
    </button>
    <div>
        {{ getNickname() }}
    </div>
</template>

<style scoped lang="scss">
.img{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
}
img{
  display: none;
}
</style>