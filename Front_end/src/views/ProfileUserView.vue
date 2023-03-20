<script  setup lang="ts">
    //faire requete pour recuperer l'user sur le quel on a clicker
    import capsuleUser from '@/components/capsuleUser.vue';
    import { useStore } from "vuex"

    const store = useStore();
    const user = store.getters.getOneUser;

</script>

<template>
    <div class="mainProfileUser">
        <capsuleUser />
    </div>

</template>

<style scoped lang="scss">
.mainProfileUser{
    display: flex;
    flex-direction: column;
    align-items: center;
    max-height: 100%;
    //background-color: gray;
}
</style>