import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { USERS_URL } from '@/modules/constants/'

export default new Vuex.Store({
  state: {
    allUsers: [],
    checkedUsers: [],
    usersListReady: false,
    requestPending: false
  },
  getters: {
    checkedUsersId(s) {
      return s.checkedUsers.map((item) => item.id);
    },
    allUsers(s) {
      return s.allUsers;
    },
    userById: (s) => (id) => {
      return s.allUsers.find((item) => item.id === id)
    },
    usersLoaded(s) {
      return s.usersListReady
    },
    requestIsPending(s) {
      return s.requestPending;
    }
  },
  mutations: {
    appendToUsersList(s, payload) {
      s.allUsers = [...payload];
      s.usersListReady = true;
    },
    checkUser(s, payload) {
      s.checkedUsers.push(payload);
    },
    uncheckUser(s, payload) {
      s.checkedUsers = s.checkedUsers.filter((item) => {
        return item.id !== payload.id;
      })
    },
    addUser(s, user) {
      s.allUsers.unshift(user);
    },
    updateUserData(s, user) {
      s.allUsers = s.allUsers.map((item) => {
        if (item.id === user.id) {
          return user;
        } else {
          return item;
        }
      })
    },
    changeRequestStatus(s, status) {
      s.requestPending = status;
    }
  },
  actions: {
    async getAllUsers({ commit }) {
      let response = await fetch(USERS_URL);
      let users = await response.json();

      commit('appendToUsersList', users);
    },
    async createNewUser({ commit }, user) {
      
      let response = await fetch(USERS_URL, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      let newUserData = await response.json();

      commit('addUser', newUserData);
      commit('changeRequestStatus', false)

    },
    async editUserData({ commit }, user) {
     
      try {
        let response = await fetch(`${USERS_URL}${user.id}`, {
          method: 'PUT',
          body: JSON.stringify(user),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
  
        let updatedUserData = await response.json();
        commit('updateUserData', updatedUserData);
      } catch(e) {
        alert('Fake API error - cannot rewrite missing item');
      }

      commit('changeRequestStatus', false)
      
    }
  },
  // modules: {
  // }
})
