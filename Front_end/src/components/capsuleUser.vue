<script  setup lang="ts">
//faire requete pour recuperer l'user sur le quel on a clicker
    import { useStore } from "vuex"
    
    const store = useStore();
    const user = store.getters.getOneUser;
    console.log('user in capsul = ', user);
</script>

<template>
    <div class="capsule">
        <div class="notMe" v-if="user.user_user_id != store.getters.getId">
            <div>
                <img :src="store.getters.getArrayAvatar(user.user_user_id)" />
            </div>
            <div>
                user_nickname = {{ user.user_nickname }}
            </div>
        </div>
        <div>
            nb parties = {{ user.stats_games }}
        </div>
        <div>
            nb victoires = {{ user.stats_victories }}
        </div>
        <div>
            nb defaites = {{ user.stats_defeats }}
        </div>
        <div>
            is active = {{ user.user_isActive}}
        </div>
    </div>    
</template>

<style scoped lang="scss">  
.notMe{
    display: flex;
    flex-direction: column;
    background-color: aquamarine;
}
.capsule{
    display: flex;
    flex-direction: column;
    text-align: center;
    //max-height: 100%;
    height: 20rem;
    background-color: darkmagenta;
}
img{
    max-width: 150px;
    height: 150px;
    border-radius: 50%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}
</style>