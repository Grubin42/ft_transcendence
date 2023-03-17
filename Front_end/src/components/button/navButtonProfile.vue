<script  setup lang="ts">
    import { useStore } from "vuex"
    import router from '@/router'

    const store = useStore();

    function clickCheckWhat(what: string){
        if(what == 'me'){
            store.commit('setWhat', what);
        }
        router.push('/Profile/user');
    }

</script>

<template>
    <div class="avatarButton">
        <button class="img" @click="clickCheckWhat('me')" :style="{ backgroundImage: 'url(' + store.getters.getAvatar + ')' }">
            <img :src="store.getters.getAvatar" />
        </button>
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
.avatarButton{
    display: flex;
    flex-direction: column;
    align-items: center;
    max-height: 100%;
}
</style>