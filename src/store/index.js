import Vue from 'vue';
import Vuex from 'vuex';

import auth from './auth';
import common from './common';
import restaurant from './restaurant';
import user from './user';
import report from './report';
import notification from './notification';
import masterdata from './masterdata';
import setting from './setting';
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
      restaurant,
      user,
      report,
      notification,
      masterdata,
      setting,
    },
  });

  return Store;
}
