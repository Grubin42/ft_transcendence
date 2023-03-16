import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

const persistedState = createPersistedState({});

const store = createStore({
  plugins: [persistedState],

  state: {
      isToken: "", 
      isDoubleAuth: false,
      isId: 0,
      isNickname: "",
      isAvatar: "",
  },

  mutations: {
    setToken(state, newToken){state.isToken = newToken},
    setDoubleAuth(state, newDoubleAuth){state.isDoubleAuth = newDoubleAuth},
    setId(state, newId){state.isId = newId},
    setNickname(state, isNickname) {state.isNickname = isNickname},
    setAvatar(state, isAvatar) {state.isAvatar = isAvatar},
  },

  getters: {
    getToken: state => state.isToken,
    getDoubleAuth: state => state.isDoubleAuth,
    getId: state => state.isId,
    getAvatar: state => state.isAvatar,
    getNickname: state => state.isNickname,
  },
})

export default store;