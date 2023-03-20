<script  setup lang="ts">
    //faire requete pour recuperer l'user sur le quel on a clicker
    import FormModifProfil from "../components/form/formModifProfil.vue";
    import capsuleUser from '@/components/capsuleUser.vue';
    import { useStore } from "vuex"

    const store = useStore();
    const user = store.getters.getOneUser;

</script>

<template>
    <div class="ProfileUser">
        <div class="form">
            <FormModifProfil />
        </div>
        <div class="caps">
            <capsuleUser />
        </div>
    </div>

</template>

<style scoped lang="scss">
.caps{
    background-color: aqua;
}
.form{
    height: 20rem;
    background-color: darkgray;
}
.ProfileUser{
    height: 20rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
    background-color: cyan;
}
</style>