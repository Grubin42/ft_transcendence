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

      isWhat: "",

      isAllUsers: [],
      isUsers: [],
      isArrayAvatar: <any>[]
  },

  mutations: {
    setToken(state, newToken){state.isToken = newToken},
    setDoubleAuth(state, newDoubleAuth){state.isDoubleAuth = newDoubleAuth},
    setId(state, newId){state.isId = newId},
    setNickname(state, isNickname) {state.isNickname = isNickname},
    setAvatar(state, isAvatar) {state.isAvatar = isAvatar},
    setAllUsers(state, isAllUsers) {state.isAllUsers = isAllUsers},
    setUsers(state, isUsers) {state.isUsers = isUsers},
    setWhat(state, isWhat) {state.isWhat = isWhat},
    setArrayAvatar(state, payload){
      const {item, index} = payload;
      state.isArrayAvatar[index] = item;
    },
    clearArray(state) {
      state.isArrayAvatar = [];
    }

  },

  getters: {
    getToken: state => state.isToken,
    getDoubleAuth: state => state.isDoubleAuth,
    getId: state => state.isId,
    getAvatar: state => state.isAvatar,
    getNickname: state => state.isNickname,
    getAllUsers: state => state.isAllUsers,
    getUsers: state => state.isUsers,
    getWhat: state => state.isWhat,
    getArrayAvatar: (state) => (index: any) => {
      return state.isArrayAvatar[index]
    }
  },
})

export default store;