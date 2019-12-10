import Vue from 'vue';
import Vuex from 'vuex';

import auth from './auth';
import common from './common';
import notifications from './notifications';
Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      auth,
      common,
      notifications,
    },
  });

  return Store;
}
