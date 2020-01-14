/* eslint-disable */
/**
 * @jest-environment jsdom
 */
import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import * as All from 'quasar';
import App from '../../../src/App.vue';

describe('App Quasar', () => {
  const { Quasar } = All;
  const localVue = createLocalVue();

  localVue.use(Quasar);

  const wrapper = mount(App, {
    localVue,
  });

  it('creates a wrapper', () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });
});
