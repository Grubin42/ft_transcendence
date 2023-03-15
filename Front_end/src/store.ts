import { createStore } from 'vuex'
import { io } from 'socket.io-client';
import createPersistedState from 'vuex-persistedstate'

const persistedState = createPersistedState({
  paths: ['self.isToken']
});

const store = createStore({
  plugins: [persistedState],

  state: {
    self: {
      isToken: "", 
      isDoubleAuth: false,
      isId: 0,
      isNickname: "",
      isAvatar: "",
    },
    isStatusCode: false,
  },

  mutations: {
    setSelf(state, newSelf){state.self = newSelf},
    setStatusCode(state,  isStatusCode) {state.isStatusCode =  isStatusCode},
  },

  getters: {
    getSelf: state => state.self,
    getStatusCode: state => state.isStatusCode,
  },

  actions: {
    setSelfProps(context, newProps){
      context.commit('setSelf', newProps)
    },
    initWebSocket({ commit }) {
      const myId = store.getters.getId;
      const webSocket = io('http://c1r2s3:3000/', {
        auth: {
          myId: myId
        }
      });

      webSocket.on('connect', () => {
        console.log('Socket connected');
        commit('setWebSocket', webSocket);
      });

      webSocket.on('disconnect', () => {
        console.log('Socket disconnected');
        commit('setWebSocket', null);
      });
    },
  }
})

export default store;