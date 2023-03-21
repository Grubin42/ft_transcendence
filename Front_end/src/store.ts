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

      isCode: false,
      isWhat: "",
      isChanId: 0,

      isAllUsers: [],
      isUsers: [],
      isOneUser: [],
      isUserContext: [],
      isArrayAvatar: <any>[],

      isChans: [],
      isChanContext: [],

  },

  mutations: {
    setToken(state, isToken){state.isToken = isToken},
    setDoubleAuth(state, isDoubleAuth){state.isDoubleAuth = isDoubleAuth},
    setId(state, isId){state.isId = isId},
    setNickname(state, isNickname) {state.isNickname = isNickname},
    setAvatar(state, isAvatar) {state.isAvatar = isAvatar},
    setCode(state, isCode) {state.isCode = isCode},
    setAllUsers(state, isAllUsers) {state.isAllUsers = isAllUsers},
    setUsers(state, isUsers) {state.isUsers = isUsers},
    setOneUser(state, isOneUser) {state.isOneUser = isOneUser},
    setUserContext(state, isUserContext) {state.isUserContext = isUserContext},
    setChanContext(state, isChanContext) {state.isChanContext = isChanContext},
    setWhat(state, isWhat) {state.isWhat = isWhat},
    setChanId(state, isChanId) {state.isChanId = isChanId},
    setArrayAvatar(state, payload){
      const {item, index} = payload;
      state.isArrayAvatar[index] = item;
    },
    clearArray(state) {
      state.isArrayAvatar = [];
      state.isOneUser= [];
    },
    setChans(state,  isChans) {state.isChans =  isChans},
  },

  getters: {
    getToken: state => state.isToken,
    getDoubleAuth: state => state.isDoubleAuth,
    getId: state => state.isId,
    getAvatar: state => state.isAvatar,
    getCode: state => state.isCode,
    getNickname: state => state.isNickname,
    getAllUsers: state => state.isAllUsers,
    getUsers: state => state.isUsers,
    getOneUser: state => state.isOneUser,
    getUserContext: state => state.isUserContext,
    getChanContext: state => state.isChanContext,
    getWhat: state => state.isWhat,
    getChanId: state => state.isChanId,
    getArrayAvatar: (state) => (index: any) => {
      return state.isArrayAvatar[index]
    },
    getChans: state => state.isChans,
  },
})

export default store;