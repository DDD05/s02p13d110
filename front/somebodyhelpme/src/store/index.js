import Vue from "vue";
import Vuex from "vuex";
import http from "@/utils/http-require.js";
import createPersistedState from "vuex-persistedstate";
// import Cookies from "js-cookie";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState()
    // {
    // storage: {
    //   getItem: key => Cookies.get(key),
    //   setItem: (key, value) => Cookies.set(key, value, { expires: 3, secure: true }),
    //   removeItem: key => Cookies.remove(key)
    // }
    // }
  ],
  state: {
    preloader: false,
    isAuth: false,
    members: {
      membersId: "",
      name: "",
      email: "",
      address: "",
      phone: "",
      account: "",
      image: "",
      portfolio: "",
      about: "",
      rank: 0
    }
  },
  mutations: {
    enableAuth: state => (state.isAuth = true),

    disableAuth: state => (state.isAuth = false),

    // insert member info of state by payload
    insVuexMemberInfo: (state, payload) => (state.members = payload),

    enableLoading: state => (state.preloader = true),

    disableLoading: state => (state.preloader = false)
  },
  actions: {
    searchMemberById: (context, payload) => {
      http.get(`/member/search/${payload}`).then(res => {
        context.commit("insVuexMemberInfo", res.data);
      });
      context.commit("enableAuth");
    }
  },
  modules: {},
  getters: {}
});
