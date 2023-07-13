import { createStore } from 'vuex';
import VuexPersistence from 'vuex-persist';

const vuexPersistState = new VuexPersistence({
  storage: window.localStorage,
  reducer: state => ({
    theme: state.theme,
  }),
});

const store = createStore({
  state() {
    return {
      theme: 'light',
    };
  },
  mutations: {
    changeTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
  },
  getters: {
    loggedIn: state => state.user && state.user.id,
  },
  plugins: [vuexPersistState.plugin],
});

export { store };
export default store;
