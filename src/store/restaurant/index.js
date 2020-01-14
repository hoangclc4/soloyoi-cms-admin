import state from './state';
import * as getters from './getters';
import * as mutations from './mutations/index';
import * as actions from './actions/index';

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
